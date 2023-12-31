const express = require('express');
const router = express.Router();
const { User } = require('../../models/model');

// 유저 정보를 수정하는 API
router.put('/:userId', async (req, res) => {
    try {
        // URL 파라미터에서 유저 ID 추출
        const { userId } = req.params;
        const { email, phone, address } = req.body;

        // 해당 유저 ID를 가진 유저 찾기
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 유저 정보 업데이트 (제공된 경우에만)
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        await user.save();

        // 성공 응답 전송
        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
