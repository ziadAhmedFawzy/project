const namePro = document.getElementById("namePro");
const descPro = document.getElementById("descPro");
const pricePro  = document.getElementById("pricePro");
const discPro  = document.getElementById("discPro");
const Category  = document.getElementById("Category");
const img  = document.getElementById("img");
const addProd  = document.getElementById("addProd");
const EditProd  = document.getElementById("EditProd");
const orderSpace = document.getElementById("orders");
const totalPrice = document.getElementById("totalPrice");
const search = document.getElementById("search");
const fileName = document.getElementById("fileName");
const box_total_price = document.getElementById("box_total_price");

let count = parseInt(localStorage.getItem("count")) || 0;
let products = JSON.parse(localStorage.getItem("products")) || [];

// function DELETE
function DEL(id) {
    let getproduct = JSON.parse(localStorage.getItem('products'));
    let filter = getproduct.filter((e) => e.id !== id);
    console.log(filter);
    return localStorage.setItem("products", JSON.stringify(filter));
}

// function EDIT
function EDIT(id) {
    let getproduct = JSON.parse(localStorage.getItem('products'));
    return getproduct.find((e) => e.id == id);
}

// Handle image path from the input witout fack path :)
function handleImg(imgInput) {
    return imgInput.files && imgInput.files[0] ? imgInput.files[0].name : '';
}

// Add new product
addProd.addEventListener("click", () => {
    let path = handleImg(img);
    if (namePro.value !== '' && descPro.value.length >= 50 && pricePro.value !== '' && discPro.value !== '' && totalPrice.innerHTML > 0 && Category.value !== '') {
        count++;
        localStorage.setItem("count", count);

        let newProduct = {
            id: count,
            name: namePro.value,
            description: descPro.value,
            price: parseFloat(pricePro.value),
            discount: parseFloat(discPro.value),
            cat: Category.value,
            img: path,
        };

        newProduct.totalPrice = newProduct.price - newProduct.discount;
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        window.location.reload();
        updateOrderTable();
    } else {
        window.alert("من فضلك أكمل جميع الحقول بشكل صحيح.");
    }
});

// window.onload = function() {
    updateOrderTable(products);
// }

search.addEventListener("input", () => {
    let searchTerm = search.value.toLowerCase();
    let filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
    });
    updateOrderTable(filteredProducts);
});

function updateOrderTable(filteredProducts) {
    orderSpace.innerHTML = '';

    if (!filteredProducts || !Array.isArray(filteredProducts)) {
        return;
    }

    filteredProducts.forEach(product => {
        let tr = document.createElement('tr');
        let del = document.createElement('button');
        let edit = document.createElement('button');
        edit.classList.add("editing");
        del.classList.add("deleting");

        let imgEl = document.createElement('img');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let td7 = document.createElement('td');
        td7.appendChild(imgEl);

        td1.textContent = product.id;
        td2.textContent = product.name;
        td3.textContent = product.price + " EGP";
        td4.textContent = product.discount + " EGP";
        td5.textContent = product.totalPrice + " EGP";
        td6.textContent = product.cat;
        imgEl.src = product.img ? `/docs/products/${product.img}` : '';
        imgEl.style.cssText = `width: 50px`;

        edit.textContent = "Edit";
        del.textContent = "delete";

        edit.onclick = () => {
            namePro.value = EDIT(product.id).name;
            descPro.value = EDIT(product.id).description;
            pricePro.value = EDIT(product.id).price;
            Category.value = EDIT(product.id).cat;
            discPro.value = EDIT(product.id).discount;
            totalPrice.innerHTML = EDIT(product.id).totalPrice;
            fileName.innerHTML = EDIT(product.id).img;
            namePro.setAttribute("data-id", product.id);

            addProd.classList.add("hidden");
            EditProd.classList.remove("hidden");
        };

        del.onclick = () => {
            console.log(product.id);
            DEL(product.id);
            window.location.reload();
        };

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(edit);
        tr.appendChild(del);

        orderSpace.appendChild(tr);
    });
    resetForm();
}

function resetForm() {
    namePro.value = "";
    descPro.value = "";
    pricePro.value = "";
    discPro.value = "";
    totalPrice.innerHTML = "0";
    Category.value = "";
    img.value = "";
}

pricePro.addEventListener("input", () => {
    let price = parseFloat(pricePro.value) || 0;
    let discount = parseFloat(discPro.value) || 0;
    totalPrice.innerHTML = price - discount;
    togglePriceClass();
});

discPro.addEventListener("input", () => {
    let price = parseFloat(pricePro.value) || 0;
    let discount = parseFloat(discPro.value) || 0;
    totalPrice.innerHTML = price - discount;
    togglePriceClass();
});

function togglePriceClass() {
    if (totalPrice.innerText <= '0') {
        box_total_price.classList.add("empty");
        box_total_price.classList.remove("not-empty");
    } else {
        box_total_price.classList.add("not-empty");
        box_total_price.classList.remove("empty");
    }
}

EditProd.addEventListener("click", function() {
    const path = img.files && img.files[0] ? img.files[0].name : fileName.innerHTML;

    let getProduct = JSON.parse(localStorage.getItem("products"));

    let updatedProduct = {
        id: parseInt(namePro.getAttribute("data-id")),
        name: namePro.value,
        description: descPro.value,
        price: parseFloat(pricePro.value),
        discount: parseFloat(discPro.value),
        totalPrice: parseFloat(pricePro.value) - parseFloat(discPro.value),
        cat: Category.value,
        img: path, 
    };

    let findProduct = getProduct.find(product => product.id === updatedProduct.id);

    if (findProduct) {
        let index = getProduct.indexOf(findProduct);
        getProduct[index] = updatedProduct;

        localStorage.setItem("products", JSON.stringify(getProduct));
        updateOrderTable(getProduct);
    }

    addProd.classList.remove("hidden");
    EditProd.classList.add("hidden");

    resetForm();
    fileName.innerHTML = "ADD IMG"
    box_total_price.classList.remove('empty');
    box_total_price.classList.remove('not-empty');
});


let clientEl = document.getElementById("client");

function client(client,pricee,email,add,statuss) {
    let tr = document.createElement("tr");
    let Client = document.createElement('td')
    let price = document.createElement('td')
    let Email = document.createElement('td')
    let address = document.createElement('td')
    let status = document.createElement('td')
    Client.textContent = client;
    price.textContent = pricee;
    Email.textContent = email;
    address.textContent = add;
    status.textContent = statuss;

    tr.appendChild(Client)
    tr.appendChild(price)
    tr.appendChild(Email)
    tr.appendChild(address)
    tr.appendChild(status)

    clientEl.appendChild(tr)
}

let getclient_order = JSON.parse(localStorage.getItem("client_order"));

getclient_order.map((e) => {
    client(e.client, e.total ,e.email ,e.add ,e.status)
})