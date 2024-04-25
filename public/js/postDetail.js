document.addEventListener("DOMContentLoaded", function() {
    const postId = new URLSearchParams(window.location.search).get('postId');

    // json 에서 id 값 가져와서 화면 그리기
    function loadPostDetail() {
        return fetch("http://localhost:3001/models/json/postDetail.json")
            .then( (res) => res.json())
            .then( (json) => json.items);
    }

    loadPostDetail().then((items) => {
        displayPostDetail(items);
    });
    

    function displayPostDetail(items) {
        const container = document.getElementById('post');
        container.innerHTML = items.filter((item) => item.postId == postId)
                                    .map(item => createPostDetail(item))                            
                                    .join("");
    }

    function createPostDetail(item) {
        return `
            <div class="title">
                <p><b>${item.title}</b></p>
            </div>
            <div class="post-header">
                <div class="writer-info">
                    <div class="writer-img">
                        <img class="writer-img" src="${item.writerPic}">
                    </div>
                    <div class="writer-name">
                        <p><b>${item.writerName}</b></p>
                    </div>
                    <div class="write-time">
                        <p>2${item.time}</p>
                    </div>
                </div>
                <div>
                    <button id="post-modify-btn" class="btn" onclick="window.location.href='./postEdit.html?postId=1'">수정</button>
                    <button id="post-delete-btn" class="btn">삭제</button>
                </div>
            </div>
            <hr class="inbody-hr">
            <div class="post-body">
                <img class="post-img" src="../${item.postPic}">
                <div class="post-content">
                    <p>
                        ${item.postContent}
                    </p>
                </div>
                <div class="post-info">
                    <div class="info">
                        <p><b>${item.view}<br>조회수</b></p>
                    </div>
                    <div class="info">
                        <p><b>${item.comment}<br>댓글</b></p>
                    </div>
                </div>
            </div>
        `;
    }

    fetch("http://localhost:3001/models/json/commentList.json")
    .then(res => res.json())
    .then(jsonData => jsonData.items)
    .then(items => {
        createComment(items.filter(item => item.postId == postId));
    }).then(()=>init());

    function createComment(comments) {
        comments.forEach(element => {
            const container = document.getElementById('comment-list');
            container.innerHTML += makeCommentTag(element);
        });
    }

    function makeCommentTag(item) {
        return `
            <div class="comment">
                <div class="comment-info">
                    <img class="writer-img" src="${item.writerPic}">
                    <div class="comment-text">
                        <div class="cmt-writer-info">
                            <div>
                                <p><b>${item.writerName}</b></p>
                            </div>
                            <div>
                                <p>${item.time}</p>
                            </div>
                        </div>
                        <div class="cmt-detail">
                            <p>${item.comment}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <button id="comment-modify-btn" class="btn comment-modify-btn">수정</button>
                        <button id="comment-delete-btn" class="btn comment-delete-btn">삭제</button>
                    </div>
                </div>
            </dv>
        `;
    }
    
})

window.onload = function() {

}

function init() {
    const postDeleteBtn = document.getElementById('post-delete-btn');
    const commentModifyBtn = document.getElementsByClassName('comment-modify-btn');
    const commentDeleteBtn = document.getElementsByClassName('comment-delete-btn');
    const postDeleteModal = document.getElementById('post-modal');
    const commentDeleteModal = document.getElementById('comment-modal');
    const postModalCancelBtn = document.getElementById('post-modal-cancel-btn');
    const postModalConfirmBtn = document.getElementById('post-modal-confirm-btn');
    const commentModalCancelBtn = document.getElementById('comment-modal-cancel-btn');
    const commentModalConfirmBtn = document.getElementById('comment-modal-confirm-btn');

    const commentInput = document.getElementById('comment-input');
    const commentBtn = document.getElementById('comment-btn');
    let commentFlag = false;

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
    Array.from(commentModifyBtn).forEach(item => {
        item.addEventListener('click', function() {
            var prevText = item.parentNode.parentNode
                    .previousElementSibling.lastElementChild
                    .lastElementChild.firstElementChild.innerText;
            document.getElementById('comment-input').value = prevText;
            document.getElementById('comment-input').focus();
        })
    })

    // 댓글 삭제 버튼
    Array.from(commentDeleteBtn).forEach(item => {
        item.addEventListener('click', function() {
            commentDeleteModal.classList.add('on');
        })
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
}

