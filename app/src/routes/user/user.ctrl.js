"use strict";
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const view = {
    home: (req, res) => {
        res.send("메인화면");
    },
    login: (req, res) => {
        res.render("user/login");
    },
    signup: (req, res) => {
        res.render("user/signup");
    },
}

const api = {
    login: async (req, res) => {
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
    },
    signup: async (req, res) => {
        try {
            // 입력 검증
            const { username, email, password, confirmPassword } = req.body;

            // 이메일 형식 검사
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "유효하지 않은 이메일 형식입니다." });
            }

            // 비밀번호 유효성 검사: 영문 + 숫자, 최소 6글자
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "비밀번호는 영문과 숫자를 포함하여 최소 6글자 이상이어야 합니다." });
            }

            // 비밀번호 일치 검사
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
            }

            // 중복 검사
            let user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({ message: "이미 존재하는 사용자 이름입니다." });
            }
            user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "이미 존재하는 이메일 주소입니다." });
            }

            // 비밀번호 해싱
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 데이터 저장
            user = new User({
                username,
                email,
                password: hashedPassword
            });
            await user.save();

            res.render('user/login', { message: "회원가입 성공! 로그인하세요." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = {
    view,
    api
};

