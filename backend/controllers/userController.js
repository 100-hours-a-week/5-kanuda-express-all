const express = require('express');
const path = require('path');
const fs = require('fs');

module.exports = {
    getUserList(req, res) {
        res.sendFile(path.join(__dirname, '../models/json/userList.json'));
    },
    postUserList(req, res) {
        const jsonData = req.body;

        const filePath = path.join(__dirname, '../models/json/userList.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err) {
                console.error('파일읽기오류: ', err);
                return res.status(500).json({ error: '파일 읽기 오류' });
            }

            let jsonDataArray = [];
            try {
                jsonDataArray = JSON.parse(data);
            } catch (parseError) {
                console.error('JSON 파싱 오류 : ', parseError);
                return res.status(500).json({ error: 'JSON 파일 파싱 오류' });
            }

            jsonDataArray.items.push(jsonData);

            const updatedJsonData = JSON.stringify(jsonDataArray);

            fs.writeFile(filePath, updatedJsonData, 'utf8', writeErr => {
                if(writeErr) {
                    console.log('파일 쓰기 오류 : ', writeErr);
                    return res.status(500).json({ error: '파일 쓰기 오류' });
                }
                res.json({ message: '데이터가 성공적으로 파일에 추가되었습니다.' });
            })
        })
    },
};