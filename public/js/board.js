const writeBtn = document.getElementById('write-btn');
const post1 = document.getElementById('post1');

writeBtn.addEventListener('mouseover', function() {
    writeBtn.classList.add('btn-active');
    writeBtn.classList.remove('btn-inactive');
})
writeBtn.addEventListener('mouseout', function() {
    writeBtn.classList.add('btn-inactive');
    writeBtn.classList.remove('btn-active');
})
writeBtn.addEventListener('click', function() {
    location.href='postWrite.html';
})

post1.addEventListener('click', function() {
    location.href='postDetail.html';
})

function loadPostList() {
    return fetch("../../models/json/postList.json")
        .then( (res) => res.json())
        .then( (json) => json.items);
}

loadPostList().then( (items) => {
    console.log(items);
    displayPostList(items);
})

function displayPostList(items) {
    const container = document.getElementById('post-list');
    container.innerHTML = items.map((item) => createPostListHTML(item)).join("");
}

function createPostListHTML(item) {
    return `
        <article class="post-box" onclick="window.location.href='postDetail.html?postId=${item.postId}'">
            <div class="post-detail">
                <div class="post-title">${item.title}</div>
                <div class="post-info">
                    <p class="post-reaction">좋아요 ${numFormat(item.like)} 댓글 ${numFormat(item.comment)} 조회수 ${numFormat(item.view)}</p>
                    <p class="post-time">${item.time}</p>
                </div>
            </div>
            <hr class="post-hr">
            <div class="post-writer">
                <img src="${item.writerPic}">
                <p class="writer-name">${item.writerName}</p>
            </div>
        </article>
    `;
}

function numFormat(num) {
    if(num >= 1000) {
        return num/1000 + "K";
    }
    return num;
}