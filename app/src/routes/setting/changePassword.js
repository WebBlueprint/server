const express = require('express');
const router = express.Router();
const { User } = require('../../models/model');
const bcrypt = require('bcrypt'); // 비밀번호 해싱을 위한 bcrypt

// 유저 비밀번호를 변경하는 API
router.put('/:userId', async (req, res) => {
    try {
        // URL 파라미터에서 유저 ID 추출
        const { userId } = req.params;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // 해당 유저 ID를 가진 유저 찾기
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 현재 비밀번호 확인
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).send('Current password is incorrect');
        }

        // 새 비밀번호와 확인 비밀번호 일치 확인
        if (newPassword !== confirmPassword) {
            return res.status(400).send('New passwords do not match');
        }

        // 새 비밀번호 해싱 및 저장
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // 성공 응답 전송
        res.status(200).send('Password changed successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
