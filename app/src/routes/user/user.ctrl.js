"use strict";
const { User } = require('../../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const view = {
    home: (req, res) => {
        res.render("user/home");
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
            const userInfo = await User.findOne({ email: req.body.email });
            if (!userInfo) return res.status(400).json({ message: "아이디를 찾을 수 없습니다." });

            const validPassword = await bcrypt.compare(req.body.password, userInfo.password);
            if (!validPassword) return res.status(400).json({ message: "잘못된 비밀번호입니다." });
            // 액세스토큰
            const accessToken = jwt.sign({
                email: userInfo.email,
                isPro: userInfo.isPro
            }, process.env.ACCESS_SECRET, {
                expiresIn: '10m',
                issuer: 'Pmatch',
            });

            // 리프레쉬토큰 
            const refreshToken = jwt.sign({
                email: userInfo.email,
                isPro: userInfo.isPro
            }, process.env.REFRESH_SECRET, {
                expiresIn: '24h',
                issuer: 'Pmatch',
            });
            // 쿠키에 담아서 토큰 클라이언트에 전송
            res.cookie("accessToken", accessToken, {
                secure: false,
                httpOnly: true,
            });
            res.cookie("refreshToken", refreshToken, {
                secure: false,
                httpOnly: true,
            });
            res.status(200).json("로그인 성공!");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    googlelogin: async (req, res) => {
        const userInfo = req.body
        console.log("서버에서 받은 구글이메일", userInfo.email)
        try {
            // 구글 로그인으로 전달받은 이메일로 DB 조회
            const user = await User.findOne({ email: userInfo.email });
            if (!user) return res.status(400).json({ message: "이메일을 찾을 수 없습니다." });

            if (user) {
                // 이미 존재하는 이메일인 경우에는 액세스 토큰과 리프레시 토큰 발급
                const accessToken = jwt.sign(
                    {
                        email: user.email,
                    },
                    process.env.ACCESS_SECRET,
                    {
                        expiresIn: '10m',
                        issuer: 'Pmatch',
                    }
                );

                const refreshToken = jwt.sign(
                    {
                        email: user.email,
                    },
                    process.env.REFRESH_SECRET,
                    {
                        expiresIn: '24h',
                        issuer: 'Pmatch',
                    }
                );

                // 쿠키에 담아서 토큰 클라이언트에 전송
                res.cookie('accessToken', accessToken, {
                    secure: false,
                    httpOnly: true,
                });

                res.cookie('refreshToken', refreshToken, {
                    secure: false,
                    httpOnly: true,
                });

                return res.status(200).json('로그인 성공!');
            } else {
                // 존재하지 않는 이메일이라면 에러 응답
                return res.status(404).json({ message: '해당 이메일로 가입된 계정이 없습니다.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    user: async (req, res) => {
        try {
            console.log("이메일" + req.body.email);
            const user = await User.findOne({ email: req.body.email });

            if (user) {
                console.log(user);
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    ,
    chatuser: async (req, res) => {
        let chatuser = await Chat.findOne({ email: req.body.email })
        if (!chatuser) {
            chatuser = new Chat({
                name: req.body.email,
                token: req.body.sid,
                online: true,
            })
        }
        user.toekn = req.body.sid
        user.online = true
        await chatuser.save()
        return chatuser
    }
    ,
    logout: (req, res) => {
        res.cookie('accessToken', '', { expiresIn: new Date(0), httpOnly: true, secure: false });
        res.cookie('refreshToken', '', { expiresIn: new Date(0), httpOnly: true, secure: false });
        res.status(200).json({ message: 'Logout successful' });
    },
    signup: async (req, res) => {
        try {
            // 입력 검증
            const { user_id, email, password, confirmPassword, birthDate, gender, isPro } = req.body;

            // 이메일 형식 검사
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "유효하지 않은 이메일 형식입니다." });
            }

            // 비밀번호 유효성 검사: 영문 + 숫자, 최소 6글자
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "비밀번호는 영문과 숫자를 포함하여 최소 6글자 이상이어야 합니다." });
            }

            // 비밀번호 일치 검사
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
            }

            // 생년월일 형식 검사: YYYY-MM-DD
            const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!birthDateRegex.test(birthDate)) {
                console.log(birthDate)
                return res.status(400).json({ message: "유효하지 않은 생년월일 형식입니다. (YYYY-MM-DD)" });
            }

            // 성별 검사: 'male', 'female', 'other'
            if (!['male', 'female', 'other'].includes(gender)) {
                return res.status(400).json({ message: "유효하지 않은 성별입니다. (male, female, other 중 선택)" });
            }

            // isPro 검사: 체크박스로 넘어온 값 변환
            const isProBoolean = isPro === 'true';

            // 중복 검사
            let user = await User.findOne({ user_id });
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
                user_id,
                email,
                password: hashedPassword,
                birthDate,
                gender,
                isPro: isProBoolean
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

