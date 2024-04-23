const nicknameInput = document.getElementById('nickname-input');
const nicknameHelper = document.getElementById('nickname-helper');
const modifyBtn = document.getElementById('modify-btn');
const toastMsg = document.getElementById('toast-msg');
const withdrawalBtn = document.getElementById('withdrawal-btn');
const modal = document.getElementById('modal');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const modalConfirmBtn = document.getElementById('modal-confirm-btn');
let nicknameFlag = false;

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
    if(nicknameFlag) {
        modifyBtn.classList.remove('btn-inactive');
        modifyBtn.classList.add('btn-active');
        return true;
    } else {
        modifyBtn.classList.add('btn-inactive');
        modifyBtn.classList.remove('btn-active');
        return false;
    }
}

modifyBtn.addEventListener('click', function() {
    if(nicknameFlag) {
        toastOn();
    } else {
        modifyBtn.classList.add('btn-inactive');
        modifyBtn.classList.remove('btn-active');
        return false;
    }
})

function toastOn() {
    toastMsg.classList.add('active');
    setTimeout(function() {
        toastMsg.classList.remove('active');
    }, 1000);
}

withdrawalBtn.addEventListener('click', function() {
    modal.classList.add('on');
})

modalCancelBtn.addEventListener('click', function() {
    modal.classList.remove('on');
})

modalConfirmBtn.addEventListener('click', function() {
    modal.classList.remove('on');
    // 회원 탈퇴 로직 진행
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
