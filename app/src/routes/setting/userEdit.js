const express = require('express');
const router = express.Router();
const {User} = require('../../models/model');

// 유저 정보를 수정하는 API
router.put('/', async (req, res) => {
    try {
        // 유저 정보 추출
        const { userId, email, phone, address } = req.body;

        // 해당 유저 ID를 가진 유저 찾기
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 유저 정보 업데이트
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        await user.save();

        // 성공 응답 전송
        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
