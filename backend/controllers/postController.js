const express = require('express');
const path = require('path');

module.exports = {
    getPostList(req, res) {
        res.sendFile(path.join(__dirname, '../models/json/postList.json'));
    },
    getPostDetail(req, res) {
        res.sendFile(path.join(__dirname, '../models/json/postDetail.json'));
    },
    getCommentList(req, res) {
        res.sendFile(path.join(__dirname, '../models/json/commentList.json'));
    },
};