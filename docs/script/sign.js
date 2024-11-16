// get all inputs

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const UN = document.getElementById('UN');
const mail = document.getElementById('mail');
const DOB = document.getElementById('DOB');
const PASS = document.getElementById('PASS');
const Rpass = document.getElementById('Rpass');
const SIGN = document.getElementById('sign');
const generatePass = document.getElementById('generatePass');

// messages
let mess1 = document.getElementById("message1")
let mess2 = document.getElementById("message2")
let mess3 = document.getElementById("message3")
let mess4 = document.getElementById("message4")


// calc my age with current date
function CurrentAge(birth) {
    // make my birth date
    let birtday = new Date(birth);
    // make current date
    let current = new Date;
    return String(current.getFullYear() - birtday.getFullYear());
}

generatePass.addEventListener("click", () => {
    if(firstName.value !== '' && lastName.value !== '') {
        let compine = `${firstName.value}${lastName.value}`;
        let generate = Math.floor(999 * Math.random(100));
        UN.value = compine + generate;
    }
})

// bush info Sign :*
SIGN.addEventListener("click", () => {
    if(firstName.value !== '' && lastName.value !== '' && UN.value !== '') {
        mess1.innerHTML = ""
        if(PASS.value.length >= 8 ) {
            mess2.innerHTML = ""
            if(PASS.value === Rpass.value) {
                mess3.innerHTML = ''
                if(mail.value.includes("gmail.com")) {
                    mess4.innerHTML = ''
                    localStorage.setItem("user", JSON.stringify({
                        f1: firstName.value,
                        l2: lastName.value,
                        userN: UN.value,
                        mail: mail.value,
                        pass: PASS.value,
                        email: mail.value,
                        age: CurrentAge(DOB.value),
                        log: false,
                    }))
                    location.assign('../../pages/login.html')
                }
                else {
                    mess4.innerHTML = "you must your mail inlcude (@gmail.com)";
                }
            }
            else {
                mess3.innerHTML = "Your password did not match, please try again!"
            }
        }
        else {
            mess2.innerHTML = "write password consists of 8 character at least."
        }
    }
    else {
        mess1.innerHTML = "some fields are empty!"
    }
})