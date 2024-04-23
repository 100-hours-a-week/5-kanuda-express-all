const postModifyBtn = document.getElementById('post-modify-btn');
const postDeleteBtn = document.getElementById('post-delete-btn');
const commentModifyBtn = document.getElementById('comment-modify-btn');
const commentDeleteBtn = document.getElementById('comment-delete-btn');
const postDeleteModal = document.getElementById('post-modal');
const commentDeleteModal = document.getElementById('comment-modal');
const postModalCancelBtn = document.getElementById('post-modal-cancel-btn');
const postModalConfirmBtn = document.getElementById('post-modal-confirm-btn');
const commentModalCancelBtn = document.getElementById('comment-modal-cancel-btn');
const commentModalConfirmBtn = document.getElementById('comment-modal-confirm-btn');

const commentInput = document.getElementById('comment-input');
const commentBtn = document.getElementById('comment-btn');
let commentFlag = false;

postModifyBtn.addEventListener('click', function() {
    location.href="./postEdit.html";
})

postDeleteBtn.addEventListener('click', function() {
    postDeleteModal.classList.add('on');
})

postModalCancelBtn.addEventListener('click', function() {
    postDeleteModal.classList.remove('on');
})

// 게시물 삭제 모달 > 확인 버튼
postModalConfirmBtn.addEventListener('click', function() {
    // 게시글 삭제 로직
})

// 댓글 수정 버튼
commentModifyBtn.addEventListener('click', function() {
    // 댓글 수정 로직
})

commentDeleteBtn.addEventListener('click', function() {
    commentDeleteModal.classList.add('on');
})

commentModalCancelBtn.addEventListener('click', function() {
    commentDeleteModal.classList.remove('on');
})

// 댓글 삭제 모달 > 확인 버튼
commentModalConfirmBtn.addEventListener('click', function() {
    // 댓글 삭제 로직
})

// 댓글 유효성 검사
commentInput.addEventListener('keyup', function() {
    commentFlag = false;
    if(commentInput.value.length == 0) {

    } else {
        commentFlag = true;
    }
    btnActive();
})

function btnActive() {
    if(commentFlag) {
        commentBtn.classList.remove('btn-inactive');
        commentBtn.classList.add('btn-active');
        return true;
    } else {
        commentBtn.classList.add('btn-inactive');
        commentBtn.classList.remove('btn-active');
        return false;
    }
}
