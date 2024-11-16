const UN = document.getElementById("UN");
const PASS = document.getElementById("PASS");
const message = document.getElementById("message");
const LOGIN = document.getElementById("LOGIN");

let getData = JSON.parse(localStorage.getItem("user"));

LOGIN.addEventListener("click", () => {
    if(UN.value === getData.userN && PASS.value === getData.pass) {
        // login user :)
        getData.log = true; 
    
        localStorage.setItem("user", JSON.stringify(getData));
        location.assign('../../index.html')
    }
    else if((UN.value === 'admin' && PASS.value === '#root')) {
        window.location.assign('../../pages/admin.html');
    }
    else {
        message.innerHTML = "username or password is wrong, try again."
    }
})