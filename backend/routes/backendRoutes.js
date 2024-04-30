const express = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

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
    
            cb(null, file.originalname + '.' + ext);
        },
    }),
});

// router.get('/models/json/postList.json', (req, res) => {
//     postController.getPostList(req, res);
// });

router.get('/models/json/postDetail.json', (req, res) => {
    postController.getPostDetail(req, res);
});

router.get('/models/json/commentList.json', (req, res) => {
    postController.getCommentList(req, res);
});

router.get('/models/json/userList.json', (req, res) => {
    userController.getUserList(req, res);
});

router.post('/models/json/userList.json', (req, res) => {
    userController.postUserList(req, res);
});

router.post('/models/json/postDetail.json', upload.single("image"), (req, res) => {
    console.log("router post detail");
    postController.postPostDetail(req, res);
});

router.put('/post/:id', upload.single("image"), (req, res) => {
    postController.putPost(req, res);
});

module.exports = router;