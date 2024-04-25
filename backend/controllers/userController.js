const express = require('express');
const path = require('path');

module.exports = {
    getUserList(req, res) {
        res.sendFile(path.join(__dirname, '../models/json/userList.json'));
    },
};