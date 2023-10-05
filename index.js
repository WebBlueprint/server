const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // HTTP 요청을 위한 라이브러리

const app = express();
const PORT = 4000; // 테스트 서버의 포트 번호

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // EJS 템플릿 엔진 사용

// 로그인 페이지 라우트
app.get('/login', (req, res) => {
    res.render('login', { message: "" });
});

// 로그인 요청 처리 라우트
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/user/login', {
            username: req.body.username,
            password: req.body.password
        });
        res.render('login', { message: "로그인 성공!" });
    } catch (error) {
        res.render('login', { message: "로그인 실패" });
    }
});

app.listen(PORT, () => {
    console.log(`Test server is running on port ${PORT}`);
});

// 회원가입 페이지 라우트
app.get('/signup', (req, res) => {
    res.render('signup', { message: "" });
});

// 회원가입 요청 처리 라우트
app.post('/signup', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/user/signup', {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        console.log("회원가입 성공!")
        res.render('login', { message: "회원가입 성공! 로그인하세요." });
    } catch (error) {
        res.render('signup', { message: "회원가입 실패" });
    }
});
