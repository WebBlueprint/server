const express = require('express');
const Pro = require('../models/Pro');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 프로 정보 등록
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const pro = new Pro({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        await pro.save();
        res.status(201).json({ message: "프로 등록!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 프로 로그인
router.post('/login', async (req, res) => {
    try {
        const pro = await Pro.findOne({ username: req.body.username });
        if (!pro) return res.status(400).json({ message: "아이디를 찾을 수 없습니다." });

        const validPassword = await bcrypt.compare(req.body.password, pro.password);
        if (!validPassword) return res.status(400).json({ message: "잘못된 비밀번호입니다." });

        const token = jwt.sign({ _id: pro._id }, process.env.SECRET_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 예약 확인
router.get('/reservations', async (req, res) => {
});

// 스케쥴 확인
router.get('/schedules', async (req, res) => {
});

// 스케쥴 편집
router.put('/schedules', async (req, res) => {
});

module.exports = router;
