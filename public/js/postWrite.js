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
        sendFormData();
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

function sendFormData() {
    const formData = new FormData();
    formData.append('title', titleInput.value);
    formData.append('postContent', contentInput.value);
    // 사진이 없을땐 append 하지 않기. 그래야 불러올때 오류 안남
    formData.append('postPic', document.getElementById('file-name').innerText);
    formData.append('like', 0);
    formData.append('comment', 0);
    formData.append('view', 0);
    formData.append('time', "2024-04-20 00:00:00");
    formData.append('writerPic', "profile_img.jpeg");
    formData.append('writerName', "작성자1"); // 나중에 세션 구현하면 세션에서 닉네임 가져다쓰기
    formData.append('image', document.getElementById('file').files[0]);

    fetch('http://localhost:3001/models/json/postDetail.json', {
        method: 'POST',
        headers: {},
        body: formData,
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

}