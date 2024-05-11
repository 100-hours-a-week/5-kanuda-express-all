document.addEventListener("DOMContentLoaded", () => {
    const postId = new URLSearchParams(window.location.search).get('postId');

    // 게시글 내용 불러오기
    fetch("http://localhost:3001/models/json/postDetail.json")
        .then( res => res.json() )
        .then( json => json.items )
        .then( items => {
            const container = document.getElementById('post');
            container.innerHTML = items.filter((item) => item.postId == postId)
                                        .map(item => createPostDetail(item))                            
                                        .join("");
        });

    const createPostDetail = item => {
        return `
            <div class="title">
                <p><b>${item.title}</b></p>
            </div>
            <div class="post-header">
                <div class="writer-info">
                    <div class="writer-img">
                        <img class="writer-img" src="../sources/${item.writerPic}">
                    </div>
                    <div class="writer-name">
                        <p id='writer-name'><b>${item.writerName}</b></p>
                    </div>
                    <div class="write-time">
                        <p>2${item.time}</p>
                    </div>
                </div>
                <div>
                    <button id="post-modify-btn" class="btn">수정</button>
                    <button id="post-delete-btn" class="btn">삭제</button>
                </div>
            </div>
            <hr class="inbody-hr">
            <div class="post-body">
                <img class="post-img" src="../sources/${item.postPic}">
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

    // 댓글 정보 부럴오기
    fetch("http://localhost:3001/models/json/commentList.json")
    .then( res => res.json() )
    .then( jsonData => jsonData.items )
    .then( items => {
        createComment(items.filter(item => item.postId == postId));
    }).then(()=>init());

    const createComment = (comments) => {
        comments.forEach(element => {
            const container = document.getElementById('comment-list');
            container.innerHTML += makeCommentTag(element);
        });
    };

    const makeCommentTag = (item) => {
        return `
            <div id="comment-${item.commentId}" class="comment">
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
            </div>
        `;
    }
    
})

window.onload = function() {

}

const init = () => {
    const postModifyBtn = document.getElementById('post-modify-btn');
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
    const commentModifyFetchBtn = document.getElementById('comment-modify-btn');
    let commentFlag = false;

    const writerName = document.getElementById('writer-name');

    document.getElementById('prev-btn').addEventListener('click', function() {
        location.href='/board';
    })

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    postModifyBtn.addEventListener('click', () => {
        // 로그인 정보와 게시글 작성자 비교
        getEmailByWriterName(writerName.innerText)
        .then(email => {
            if(getCookie('isLogin') == 'true' && getCookie('userEmail') == email) {
                location.href = `/postEdit?postId=&{postId}`;
            } else {
                // 애초에 권한 있는 사람만 버튼이 보이게 해야하는거 아닐까
                alert('게시글 작성자가 아닙니다.');
            }
        })
        .catch(error => {
            alert('게시글 작성자가 아닙니다.');
        })
    })

    // 게시글 삭제 버튼
    postDeleteBtn.addEventListener('click', () => {
        // 로그인 정보와 게시글 작성자 비교
        getEmailByWriterName(writerName.innerText)
        .then(email => {
            if(getCookie('isLogin') == 'true' && getCookie('userEmail') == email) {
                postDeleteModal.classList.add('on');
            } else {
                // 애초에 권한 있는 사람만 버튼이 보이게 해야하는거 아닐까
                alert('게시글 작성자가 아닙니다.');
            }
        })
        .catch(error => {
            alert('게시글 작성자가 아닙니다.');
        })
    })

    // writername 으로 user email 반환하는 함수
    function getEmailByWriterName(writerName) {
        return fetch('http://localhost:3001/models/json/userList.json')
        .then( res => res.json() )
        .then( json => json.items )
        .then( items => {    
            const writer = items.find(item => item.nickName == writerName);
            if(writer) {
                return writer.email;
            } else {
                throw new Error('작성자를 찾을 수 없습니다.');
            }
        });
    }

    postModalCancelBtn.addEventListener('click', () => {
        postDeleteModal.classList.remove('on');
    })

    // 게시물 삭제 모달 > 확인 버튼
    postModalConfirmBtn.addEventListener('click', () => {
        deletePost();
    })

    // 댓글 등록 버튼
    commentBtn.addEventListener('click', () => {
        postComment();
    });

    // 댓글 수정 버튼
    Array.from(commentModifyBtn).forEach( item => {
        item.addEventListener('click', () => {
            let commentText = item.parentNode.parentNode
            .previousElementSibling.lastElementChild;
            let writerName = commentText.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText;
            getEmailByWriterName(writerName)
            .then(email => {
                if(getCookie('isLogin') == 'true' && getCookie('userEmail') == email) {
                    var prevText = commentText
                                    .lastElementChild.firstElementChild.innerText;
                    document.getElementById('comment-input').value = prevText;
                    document.getElementById('comment-input').focus();

                    commentBtn.style.display = 'none';
                    commentModifyFetchBtn.style.display = 'block';

                    selectedCommentId = item.parentNode.parentNode.parentNode.id.split("-")[1];
                } else {
                    // 애초에 권한 있는 사람만 버튼이 보이게 해야하는거 아닐까
                    alert('게시글 작성자가 아닙니다.');
                }
            })
            .catch(error => {
                alert('댓글 작성자가 아닙니다.');
            })
        })
    })

    // 댓글 수정 등록 버튼
    commentModifyFetchBtn.addEventListener('click', () => {
        putComment();
    })

    let selectedCommentId = 0;

    // 댓글 삭제 버튼
    Array.from(commentDeleteBtn).forEach( item => {
        item.addEventListener('click', () => {
            let commentText = item.parentNode.parentNode
            .previousElementSibling.lastElementChild;
            let writerName = commentText.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText;
            getEmailByWriterName(writerName)
            .then(email => {
                if(getCookie('isLogin') == 'true' && getCookie('userEmail') == email) {
                    commentDeleteModal.classList.add('on');
                    selectedCommentId = item.parentNode.parentNode.parentNode.id.split("-")[1];
                    console.log(selectedCommentId);
                } else {
                    // 애초에 권한 있는 사람만 버튼이 보이게 해야하는거 아닐까
                    alert('게시글 작성자가 아닙니다.');
                }
            })
            .catch(error => {
                alert('댓글 작성자가 아닙니다.');
            })
        })
    })

    commentModalCancelBtn.addEventListener('click', () => {
        commentDeleteModal.classList.remove('on');
    })

    // 댓글 삭제 모달 > 확인 버튼
    commentModalConfirmBtn.addEventListener('click', () => {
        deleteComment();
    })

    // 댓글 유효성 검사
    commentInput.addEventListener('keyup', () => {
        commentFlag = false;
        if(commentInput.value.length == 0) {

        } else {
            commentFlag = true;
        }
        btnActive();
    })

    const btnActive = () => {
        if(commentFlag) {
            commentBtn.classList.remove('btn-inactive');
            commentBtn.classList.add('btn-active');
            commentModalConfirmBtn.classList.remove('btn-inactive');
            commentModalConfirmBtn.classList.add('btn-active');
            return true;
        } else {
            commentBtn.classList.add('btn-inactive');
            commentBtn.classList.remove('btn-active');
            commentModalConfirmBtn.classList.add('btn-inactive');
            commentModalConfirmBtn.classList.remove('btn-active');
            return false;
        }
    }

    const postId = new URLSearchParams(window.location.search).get('postId');

    const deletePost = () => {
        fetch(`http://localhost:3001/post/${postId}`, {
            method: 'DELETE',
            headers: {},
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(window.location.href = '/board');
    }

    const postComment = () => {
        // 왜 formData 로 받으면 body가 비워져있을까...?
        // const formData = new FormData();
        // formData.append('postId', postId);
        // formData.append('comment', commentInput.value);
        // formData.append('time', "2024-04-20 00:00:00");
        // formData.append('writerPic', "profile_img.jpeg");
        // formData.append('writerName', "작성자1"); // 나중에 세션 구현하면 세션에서 닉네임 가져다쓰기

        fetch(`http://localhost:3001/comment/${postId}`, {
            method: 'POST',
            // headers: {},
            // body: formData,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'postId': postId,
                'comment': commentInput.value,
                'time': "2024-04-20 00:00:00",
                'writerPic': "profile_img.jpeg",
                'writerName': "작성자1"
            })
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(window.location.href = `/postDetail?postId=${postId}`);
    }

    const deleteComment = () => {
        fetch(`http://localhost:3001/comment/${postId}/${selectedCommentId}`, {
            method: 'DELETE',
            headers: {},
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(window.location.href = `/postDetail?postId=${postId}`);
    }

    const putComment = () => {
        const formData = new FormData();
        formData.append('comment', commentInput.value);
        formData.append('time', '2024-04-30 12:00:00');

        fetch(`http://localhost:3001/comment/${postId}/${selectedCommentId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'comment': commentInput.value,
                'time': "2024-04-20 00:00:00",
            })
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(window.location.href = `/postDetail?postId=${postId}`);
    }
}

