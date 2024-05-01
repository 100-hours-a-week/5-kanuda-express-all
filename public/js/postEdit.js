const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('content-input');
const helper = document.getElementById('helper');
const modifyBtn = document.getElementById('modify-btn');

let titleFlag = false;
let contentFlag = false;

titleInput.addEventListener('keyup', () => {
    titleFlag = false;
    if(titleInput.value.length == 0) {

    } else if(titleInput.value.length > 26) {
        helper.innerText = "* 제목은 최대 26자까지 가능합니다.";
    } else {
        titleFlag = true;
        if(contentInput.value.length != 0) {
            contentFlag = true;
        } 
    }
    btnActive();
})

contentInput.addEventListener('keyup', () => {
    contentFlag = false;
    if(contentInput.value.length == 0) {
        
    } else {
        contentFlag = true;
        if(titleInput.value.length != 0) {
            titleFlag = true;
        }
    }
    btnActive();
})

const btnActive = () => {
    if(titleFlag && contentFlag) {
        modifyBtn.classList.remove('btn-inactive');
        modifyBtn.classList.add('btn-active');
        return true;
    } else {
        modifyBtn.classList.add('btn-inactive');
        modifyBtn.classList.remove('btn-active');
        return false;
    }
}

modifyBtn.addEventListener('click', () => {
    if(btnActive()) {
        checkForm();
    } else {
        helper.innerText = "* 제목, 내용을 모두 작성해주세요.";
    }
})

const checkForm = () => {
    if(btnActive()) {
        sendFormData();
        return false;
    } else {
        alert("입력 내용을 확인해주세요.");
        return false;
    }
}

document.getElementById('file').addEventListener('change', () => {
    let fileName = document.getElementById('file').value;

    if(fileName.length > 0) {
        document.getElementById('file-name').innerText = fileName;
    } else {
        document.getElementById('file-name').innerText = "파일을 선택해주세요.";
    }
})

const postId = new URLSearchParams(window.location.search).get('postId');

fetch("http://localhost:3001/models/json/postDetail.json")
.then(data => data.json())
.then(jsonData => jsonData.items)
.then(items => {
    items.filter(item=>item.postId == postId)
        .map(item => {
            titleInput.value = item.title;
            contentInput.value = item.postContent;
            // 파일도 해야함.
            document.getElementById('file-name').innerText = item.postPic;
        })
});

const sendFormData = () => {
    const formData = new FormData();
    formData.append('title', titleInput.value);
    formData.append('postContent', contentInput.value);
    formData.append('postPic', document.getElementById('file-name').innerText);
    // 파일 수정 안됐을때 로직 변경해야할듯. 보내지 말던가?
    formData.append('image', document.getElementById('file').files[0]);

    fetch(`http://localhost:3001/post/${postId}`, {
        method: 'PUT',
        headers: {},
        body: formData
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}