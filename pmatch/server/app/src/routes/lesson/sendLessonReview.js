const express = require('express');
const router = express.Router();
const { Lesson, Reservation, User, Pro } = require('../../models/model');

// 프로가 유저 레슨에 대한 피드백을 업로드하는 API
router.post('/', async (req, res) => {
    try {
        const { userId, proId, videos, photos, comment } = req.body;

        // User 테이블에서 user_id에 해당하는 유저 조회
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Pro 테이블에서 pro_id에 해당하는 유저 조회
        const pro = await Pro.findOne({ pro_id: proId });
        if (!pro) {
            return res.status(404).send('Pro not found');
        }

        // Reservation 조회: userId와 proId 사용
        const reservation = await Reservation.findOne({ user_id: user._id, pro_id: pro._id });
        if (!reservation) {
            return res.status(404).send('Reservation not found');
        }

        // 해당 Reservation에 대한 Lesson 조회
        const lesson = await Lesson.findOne({ reservation_id: reservation._id });
        if (!lesson) {
            return res.status(404).send('Lesson not found');
        }

        // 피드백 업데이트
        lesson.video = videos; // 비디오 파일 경로 배열
        lesson.image = photos; // 이미지 파일 경로 배열
        lesson.feedback = comment; // 피드백 코멘트
        await lesson.save();

        res.status(200).send('Feedback uploaded successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
