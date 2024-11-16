const CHART_SPACE = document.getElementById("CHART_SPACE");
const totalCashCart = document.getElementById("totalCashCart");

function CARD_of_CHART(Img, Title, Cat, Price) {
    let cardChart = document.createElement("div");
    cardChart.className = 'cardChart'
    
    let partleft = document.createElement("div");
    partleft.className = 'part-left'
    
    let img = document.createElement("div");
    img.className = 'img'
    img.style.backgroundImage = `url(${Img})`
    let infos = document.createElement("div");
    infos.className = 'infos'
    
    let title = document.createElement("h3");
    title.textContent = Title
    let category = document.createElement("p");
    category.textContent = `category : ${Cat}`
    let price = document.createElement("div");
    price.textContent = Price + " EGP"

    infos.appendChild(title)
    infos.appendChild(category)

    partleft.appendChild(img)
    partleft.appendChild(infos)

    cardChart.appendChild(partleft)
    cardChart.appendChild(price)

    CHART_SPACE.appendChild(cardChart);
}

let getChart = JSON.parse(localStorage.getItem("chartProduct"));

let total = 0;

getChart.map((e) => {
    total += e.totalPrice
    CARD_of_CHART(`/docs/products/${e.img}`, e.name, e.cat, e.totalPrice)
})


totalCashCart.innerHTML = total + " EGP"

let getuser = JSON.parse(localStorage.getItem("user"))

let fullName = document.getElementById("fullName");
let Email = document.getElementById("Email");
let payment = document.getElementById("payment");

let payment_MOD = document.getElementById("payment_MOD");
let Payment = ''
payment.onchange = () => {
    if(payment.value == 'visa') {
        payment = "visa"
    }
    else {
        payment = "cash"
    }
}


fullName.value = `${getuser.f1} ${getuser.l2}`
Email.value = getuser.email


let signClient = document.getElementById("signClient");
let address = document.getElementById("address");

// اتمنى التيم يتشغل و يفهم كل دا
let order_client = JSON.parse(localStorage.getItem("client_order")) || [];

signClient.addEventListener("click", function() {
    if(address.value !== '' && payment == 'visa' || payment == 'cash') {
        let addClientOrder = {
            client: fullName.value,
            total: total,
            email: Email.value,
            add: address.value,
            status: 'not received'
        };
    
        order_client.push(addClientOrder);
        localStorage.setItem("client_order", JSON.stringify(order_client));
    
        localStorage.setItem("chartProduct", '[]')
        window.location.assign("../../index.html");
    }
});
