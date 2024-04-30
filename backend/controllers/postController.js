const express = require('express');
const path = require('path');
const fs = require('fs');


module.exports = {
    getPostList(req, res) {
        res.sendFile(path.join(__dirname, '../models/json/postDetail.json'));
    },
    getPostDetail(req, res) {
        res.sendFile(path.join(__dirname, '../models/json/postDetail.json'));
    },
    getCommentList(req, res) {
        res.sendFile(path.join(__dirname, '../models/json/commentList.json'));
    },
    postPostDetail(req, res) {
        console.log("controller post detail");
        console.log(req.file);
        console.log(req.body);

        // 여기다가 게시물 데이터 json 데이터에 저장하기.
        const jsonData = req.body;
        const filePath = path.join(__dirname, '../models/json/postDetail.json');

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
            jsonData.postId = (jsonDataArray.items.length + 1).toString();
            jsonData.postPic = jsonData.postPic.split("\\")[jsonData.postPic.split("\\").length-1];
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
    putPost(req, res) {
        const jsonData = req.body;
        const filePath = path.join(__dirname, '../models/json/postDetail.json');

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

            const targetPost = jsonDataArray.items.find(item => item.postId == req.params.id);

            if(targetPost) {
                targetPost.title = jsonData.title;
                targetPost.postContent = jsonData.postContent;
                targetPost.time = jsonData.time;
                // 사진을 안넣었을때 처리 해야함.
                targetPost.postPic = jsonData.postPic.split("\\")[jsonData.postPic.split("\\").length-1];;
            } else {
                console.log('수정할 포스트 찾을 수 없음');
                return res.status(404).json({ error: '수정할 포스트 찾을 수 없음' });
            }

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
    deletePost(req, res) {
        const filePath = path.join(__dirname, '../models/json/postDetail.json');

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

            jsonDataArray.items = jsonDataArray.items.filter(item => item.postId != req.params.id);

            const updatedJsonData = JSON.stringify(jsonDataArray);

            fs.writeFile(filePath, updatedJsonData, 'utf8', writeErr => {
                if(writeErr) {
                    console.log('파일 쓰기 오류 : ', writeErr);
                    return res.status(500).json({ error: '파일 쓰기 오류' });
                }
                res.json({ message: '데이터가 삭제되었습니다.' });
            })
        });
    },
    deleteComment(req, res) {
        const filePath = path.join(__dirname, '../models/json/commentList.json');
        
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

            jsonDataArray.items = jsonDataArray.items
                                .filter(item => !(item.postId == req.params.postId && item.commentId == req.params.commentId));

            const updatedJsonData = JSON.stringify(jsonDataArray);

            fs.writeFile(filePath, updatedJsonData, 'utf8', writeErr => {
                if(writeErr) {
                    console.log('파일 쓰기 오류 : ', writeErr);
                    return res.status(500).json({ error: '파일 쓰기 오류' });
                }
                res.json({ message: '데이터가 삭제되었습니다.' });
            })
        });
    },
};