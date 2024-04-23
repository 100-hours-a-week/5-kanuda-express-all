window.onload = function() {

}

const form = document.getElementById('form');
const emailInput = document.getElementsByTagName('input')[0];
const passwordInput = document.getElementsByTagName('input')[1];
const loginBtn = document.getElementById('login-btn');
const helperText = document.getElementsByClassName('helper')[0];

emailInput.addEventListener('keyup', function() {
    if(form.checkValidity()) {
        loginBtn.classList.remove('btn-inactive');
        loginBtn.classList.add('btn-active');
    } else if(!form.checkValidity()) {
        loginBtn.classList.add('btn-inactive');
        loginBtn.classList.remove('btn-active');
    }
});

passwordInput.addEventListener('keyup', function() {
    if(form.checkValidity()) {
        loginBtn.classList.remove('btn-inactive');
        loginBtn.classList.add('btn-active');
    } else if(!form.checkValidity()) {
        loginBtn.classList.add('btn-inactive');
        loginBtn.classList.remove('btn-active');
    }
});

loginBtn.addEventListener('click', function() {
    if(!form.checkValidity()) {
        helperText.innerText = "* 입력하신 계정 정보가 정확하지 않았습니다.";
    } else {
        helperText.innerText = "";
    }
})