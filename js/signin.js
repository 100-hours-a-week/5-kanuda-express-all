window.onload = function() {

}

const profileImgDiv = document.getElementsByClassName('profile-div')[0];
const profileUploadBtn = document.getElementById('profile-img-btn');
const profileDefault = document.getElementsByClassName('profile-default')[0];
const profileImg = document.getElementById('profile-img');

const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const passwordCheckInput = document.getElementById('passwordCheck-input');
const nicknameInput = document.getElementById('nickname-input');

const profileHelper = document.getElementById('profile-helper');
const emailHelper = document.getElementById('email-helper');
const passwordHelper = document.getElementById('password-helper');
const passwordCheckHelper = document.getElementById('passwordCheck-helper');
const nicknameHelper = document.getElementById('nickname-helper');

let profileFlag = false;
let emailFlag = false;
let passwordFlag = false;
let passwordCheckFlag = false;
let nicknameFlag = false;

const signinBtn = document.getElementById('signin-btn');

profileImgDiv.addEventListener('click', function() {
    profileUploadBtn.click();
});

// 프로필 사진 설정
profileUploadBtn.addEventListener('change', function(e) {
    var reader = new FileReader();
    
    if(profileUploadBtn.files.length > 0) {
        reader.onload = function(data) {
            var img = document.getElementById("profile-img");
            img.src = data.target.result;
        }
        reader.readAsDataURL(profileUploadBtn.files[0]);
        
        profileDefault.style.display = "none";
        profileImg.style.display = "block";
        profileHelper.style.display = "none";
        profileFlag = true;
    } else {
        profileDefault.style.display = "block";
        profileImg.style.display = "none";
        profileHelper.style.display = "block";
        profileFlag = false;
    }
    btnActive();
});

// 이메일 입력 유효성 검사
emailInput.addEventListener('keyup', function() {
    emailFlag = false;
    if(emailInput.value.length == 0) {
        emailHelper.innerText = "* 이메일을 입력해주세요";
    } else if(!idLength(emailInput.value) || !emailForm(emailInput.value)) {
        emailHelper.innerText = "* 올바른 이메일 주소 형식을 입력해주세요.(예: example@example.com";
    } else {
        emailHelper.innerText = "";
        emailFlag = true;
    }
    btnActive();
});

function idLength(value) {
    return value.length >= 3;
}
function emailForm(value) {
    return value.indexOf('@') > 0 && value.indexOf('@') < value.length-1;
}

// 패스워드 유효성 검사
passwordInput.addEventListener('keyup', function() {
    passwordFlag = false;
    if(passwordInput.value.length == 0) {
        passwordHelper.innerText = "* 비밀번호를 입력해주세요."
    } else if(!passwordValidator(passwordInput.value)) {
        passwordHelper.innerText = "* 비밀번호는 8자 이상, 20자 이하이며, 영어, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
    } else {
        passwordHelper.innerText = ""
        passwordFlag = true;
    }
    btnActive();
});

function passwordValidator(value) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
}

// 비밀번호 확인 유효성 검사
passwordCheckInput.addEventListener('keyup', function() {
    passwordCheckFlag = false;
    if(passwordCheckInput.value.length == 0) {
        passwordCheckHelper.innerText = "* 비밀번호를 한번 더 입력해주세요."
    } else if(passwordInput.value != passwordCheckInput.value) {
        passwordCheckHelper.innerText = "* 비밀번호가 다릅니다.";
    } else if(!passwordValidator(passwordCheckInput.value)) {
        passwordCheckHelper.innerText = "* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    } else {
        passwordCheckHelper.innerText = "";
        passwordCheckFlag = true;
    }
    btnActive();
})

// 닉네임 유효성 검사
nicknameInput.addEventListener('keyup', function() {
    nicknameFlag = false;
    if(nicknameInput.value.length == 0) {
        nicknameHelper.innerText = "* 닉네임을 입력해주세요.";
    } else if(nicknameInput.value.length > 10) {
        nicknameHelper.innerText = "* 닉네임은 최대 10자 까지 작성 가능합니다.";
    } else if(nicknameInput.value.match(/\s/g)) {
        nicknameHelper.innerText = "* 띄어쓰기를 없애주세요.";
    } else {
        nicknameHelper.innerText = "";
        nicknameFlag = true;
    }
    btnActive();
})

function btnActive() {
    if(profileFlag && emailFlag && passwordFlag && passwordCheckFlag && nicknameFlag) {
        signinBtn.classList.remove('btn-inactive');
        signinBtn.classList.add('btn-active');
        return true;
    } else {
        signinBtn.classList.add('btn-inactive');
        signinBtn.classList.remove('btn-active');
        return false;
    }
}

function checkForm() {
    if(btnActive()) {
        return true;
    } else {
        alert("입력 내용을 확인해주세요.");
        return false;
    }
}

document.getElementById('prev-btn').addEventListener('click', function() {
    location.href='login.html';
})

let userList = "";
loadUserList();
function loadUserList() {
    return fetch("/json/userList.json")
        .then( (res) => res.json())
        .then( (json) => json.items);
}

loadUserList().then((items) => {
    userList = items;
})

function checkEmail(input) {
    return userList.map((item) => item.email)
        .find(email=>email === input);
}

emailInput.addEventListener('change', function() {
    if(checkEmail(emailInput.value)) {
        emailHelper.innerText = "* 중복된 이메일 입니다.";
        emailFlag = false;
    } else {
        
    }
})

function checkNickname(input) {
    return userList.map((item) => item.nickName)
        .find(nickname => nickname === input);
}

nicknameInput.addEventListener('change', function() {
    if(checkNickname(nicknameInput.value)) {
        nicknameHelper.innerText = "* 중복된 닉네임 입니다.";
        nicknameFlag = false;
    } else {

    }
})
