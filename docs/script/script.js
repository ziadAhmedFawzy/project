// swipper tool
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 3000, 
        disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true, 
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

// function to change variable
function updateColorVariable(variableName, newColor) {
    document.documentElement.style.setProperty(variableName, newColor);
}


// modes
const lightMode = document.getElementById('light');
const darkMode = document.getElementById("dark");

const darkModeColors = {
    "--secondaryColor": "#222",
    "--secondaryColor2": "#eee",
    "--mainColor": "#fff",
    "--lastColor": "#444",
    "--lastColor2": "#555",
    "--lastColor3": "#111"
};

const lightModeColors = {
    "--secondaryColor": "#222",
    "--secondaryColor2": "#333",
    "--mainColor": "#fff",
    "--lastColor": "#bd6500",
    "--lastColor2": "#814d11",
    "--lastColor3": "#61390a"
};

// change variables of css
function updateColorVariables(colors) {
    for (const [variable, color] of Object.entries(colors)) {
        document.documentElement.style.setProperty(variable, color);
    }
}

darkMode.addEventListener("click", () => {
    localStorage.setItem("mode", "dark"); 
    updateColorVariables(darkModeColors);
    document.body.classList.add("dark"); 
    darkMode.classList.add("hidden"); 
    lightMode.classList.remove("hidden");
});

lightMode.addEventListener("click", () => {
    localStorage.setItem("mode", "light");
    updateColorVariables(lightModeColors); 
    document.body.classList.remove("dark");
    lightMode.classList.add("hidden");
    darkMode.classList.remove("hidden");
});

// to make render for page without reload :)
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("mode") === "dark") {
        updateColorVariables(darkModeColors); 
        document.body.classList.add("dark"); 
        darkMode.classList.add("hidden"); 
        lightMode.classList.remove("hidden"); 
    } else {
        updateColorVariables(lightModeColors); 
        document.body.classList.remove("dark"); 
        lightMode.classList.add("hidden"); 
        darkMode.classList.remove("hidden"); 
    }
});

let acc = document.getElementById("acc");

let getDataOfUser = JSON.parse(localStorage.getItem('user'));


let sign = document.getElementById("sign");
let login = document.getElementById("login");
let logout = document.getElementById("logout");
let user = document.getElementById("user");

if(getDataOfUser.log) {
    sign.classList.add('hidden')
    login.classList.add('hidden')
    logout.classList.remove('hidden')
    user.innerHTML = `<i class="fa-solid fa-user"></i> ${getDataOfUser.f1} ${getDataOfUser.l2}`
}
else {
    logout.classList.add('hidden')
    user.classList.add('hidden')
}

// change log

logout.addEventListener("click", () => {
    getDataOfUser.log = false;
    localStorage.setItem("user", JSON.stringify(getDataOfUser));
    window.location.reload()
})

let addToChart = localStorage.getItem("chartProduct") || [];
let products = JSON.parse(localStorage.getItem("products"));
function FindProd(id) {
    let viewProduct = products.find((e) => {
        return id == e.id
    })
    return viewProduct
}

const PRODUCTS_SPACE = document.getElementById("PRODUCTS_SPACE");
function Card(id,img,title,total,price) {
    let box = document.createElement("div");
    let infoCard = document.createElement("div");
    let imgElement = document.createElement('div');
    let titleElement = document.createElement("h3");
    let TotalElement = document.createElement("p");
    let discountElement = document.createElement("p");
    let BuyElment = document.createElement("button");

    
    // give class name to element to take format of css
    infoCard.className = "info-card";
    imgElement.className = "img-card";
    discountElement.className = "disc";
    box.className = "card"

    BuyElment.onclick = () => {
        let product = FindProd(id)
        let array = JSON.parse(localStorage.getItem("chartProduct"))
        array.push(product)
        localStorage.setItem("chartProduct", JSON.stringify(array))
        console.log(array)
    }
    
    titleElement.textContent = title;
    TotalElement.textContent = total + " EGP";
    discountElement.textContent = price + "EGP";
    imgElement.style.backgroundImage = `url(${img})`;
    BuyElment.textContent = "buy now";
    
    infoCard.appendChild(titleElement)
    infoCard.appendChild(TotalElement)
    infoCard.appendChild(discountElement)

    box.appendChild(imgElement);
    box.appendChild(infoCard);
    box.appendChild(BuyElment);

    PRODUCTS_SPACE.appendChild(box);
}


let getProductAll = JSON.parse(localStorage.getItem("products"));

function DisplayProducts() {
    getProductAll.map((e) => {
        Card(e.id,`docs/products/${e.img}`,e.name, e.totalPrice, e.price)
    })
}

DisplayProducts()

let chartProduct = JSON.parse(localStorage.getItem("chartProduct")) || [];
let productCount = chartProduct.length;

console.log(productCount)

let chartBTN = document.getElementById("chartBTN");
chartBTN.style.setProperty('--product-count', `"${productCount}"`);

chartBTN.addEventListener('click', () => {
    if(!getDataOfUser.log) {
        window.location.assign('../../pages/login.html');
    }
    else {
        window.location.assign('../../pages/chart.html');
    }
})