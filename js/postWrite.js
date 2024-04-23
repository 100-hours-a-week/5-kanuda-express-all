const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('content-input');
const helper = document.getElementById('helper');
const submitBtn = document.getElementById('submit-btn');

let titleFlag = false;
let contentFlag = false;

titleInput.addEventListener('keyup', function() {
    titleFlag = false;
    if(titleInput.value.length == 0) {

    } else if(titleInput.value.length > 26) {
        helper.innerText = "* 제목은 최대 26자까지 가능합니다.";
    } else {
        titleFlag = true;
    }
    btnActive();
})

contentInput.addEventListener('keyup', function() {
    contentFlag = false;
    if(contentInput.value.length == 0) {

    } else {
        contentFlag = true;
    }
    btnActive();
})

function btnActive() {
    if(titleFlag && contentFlag) {
        submitBtn.classList.remove('btn-inactive');
        submitBtn.classList.add('btn-active');
        return true;
    } else {
        submitBtn.classList.add('btn-inactive');
        submitBtn.classList.remove('btn-active');
        return false;
    }
}

submitBtn.addEventListener('click', function() {
    if(btnActive()) {
        
    } else {
        helper.innerText = "* 제목, 내용을 모두 작성해주세요.";
    }
})

function checkForm() {
    if(btnActive()) {
        return true;
    } else {
        alert("입력 내용을 확인해주세요.");
        return false;
    }
}

document.getElementById('file').addEventListener('change', function() {
    let fileName = document.getElementById('file').value;

    if(fileName.length > 0) {
        document.getElementById('file-name').innerText = fileName;
    } else {
        document.getElementById('file-name').innerText = "파일을 선택해주세요.";
    }
})