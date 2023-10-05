const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 회원가입
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        console.log("Before Save");
        await user.save();
        console.log("Success");
        res.status(201).json({ message: "유저 등록!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// 로그인
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ message: "아이디를 찾을 수 없습니다." });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: "잘못된 비밀번호입니다." });

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 다가오는 예약 조회
router.get('/upcomingResv', (req, res) => {
});

// 전체 일정 조회
router.get('/allResv', (req, res) => {
});

// 나의 레슨 리뷰 조회
router.get('/myRevs', (req, res) => {
});

// 프로와의 대화 조회
router.get('/chats', (req, res) => {
});

// 라우터를 export
module.exports = router;
