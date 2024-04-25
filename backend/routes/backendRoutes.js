const express = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

const router = express.Router();

router.get('/models/json/postList.json', (req, res) => {
    postController.getPostList(req, res);
});

router.get('/models/json/postDetail.json', (req, res) => {
    postController.getPostDetail(req, res);
});

router.get('/models/json/commentList.json', (req, res) => {
    postController.getCommentList(req, res);
});

router.get('/models/json/userList.json', (req, res) => {
    userController.getUserList(req, res);
});

module.exports = router;