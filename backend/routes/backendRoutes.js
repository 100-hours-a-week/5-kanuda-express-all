const express = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const router = express.Router();
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
router.use(cookieParser());
router.use(session({
    key: 'loginData',
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
}));

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

// 파일 업로드를 위한 모듈. 파일 처리
const upload = multer({ 
    storage: multer.diskStorage({
        destination: "../public/sources",
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            console.log('upload multer');
            console.log(file);
    
            // 한글 파일명 깨짐 해결
            file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
            // 확장자 제거한 파일명 추출
            file.originalname = file.originalname.split(`.${ext}`)[0];
    
            cb(null, `${file.originalname}.${ext}`);
        },
    }),
});

// user controller
router.get('/models/json/userList.json', (req, res) => {
    userController.getUserList(req, res);
});

router.post('/models/json/userList.json', (req, res) => {
    userController.postUserList(req, res);
});

router.post('/login', (req, res) => {
    userController.postLogin(req, res);
});

router.post('/logout', (req, res) => {
    userController.postLogout(req, res);    
})

router.get('/test', (req, res) => {
    userController.getTest(req, res);
})

// post controller
// post
router.get('/models/json/postDetail.json', (req, res) => {
    postController.getPostDetail(req, res);
});

router.post('/models/json/postDetail.json', upload.single("image"), (req, res) => {
    console.log("router post detail");
    postController.postPostDetail(req, res);
});

router.put('/post/:id', upload.single("image"), (req, res) => {
    postController.putPost(req, res);
});

router.delete('/post/:id', (req, res) => {
    postController.deletePost(req, res);
});

// comment
router.get('/models/json/commentList.json', (req, res) => {
    postController.getCommentList(req, res);
});

router.post('/comment/:postId', (req, res) => {
    postController.postComment(req, res);
});

router.put('/comment/:postId/:commentId', (req, res) => {
    postController.putComment(req, res);
});

router.delete('/comment/:postId/:commentId', (req, res) => {
    postController.deleteComment(req, res);
});

module.exports = router;