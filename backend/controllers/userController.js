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
    postLogin(req, res) {
        // cookie 로그인
        // const userEmail = req.body.email;
        // res.cookie('isLogin', true, { maxAge : 1000 * 60 * 60 });
        // res.cookie('userEmail', userEmail, { maxAge : 1000 * 60 * 60 });
        // res.send('login success');
        
        // session 로그인
        const userEmail = req.body.email;
        req.session.user = { email: userEmail };
        console.log(req.session);
        res.send('login success');
    },
    postLogout(req, res) {
        // cookie 로그인
        res.cookie('isLogin', false);
        res.clearCookie('userEmail');
        res.send('logout');

        // session 로그아웃
        req.session.destroy();
        res.send('logout');
    },
    getTest(req, res) {
        const session = req.session.user;
        console.log(req.session);
        res.send(`session : ${session}`);
    },
};