const express = require('express');
const router = express.Router();
const { Lesson, Reservation, Pro } = require('../../models/model');

// 유저 ID에 따른 레슨 정보를 조회하는 API
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // URL로부터 유저 ID 추출

        // 해당 유저의 예약 조회
        const reservations = await Reservation.find({ user_id: userId }).populate('pro_id');

        // 예약과 연관된 레슨 정보 조회
        const lessons = await Promise.all(reservations.map(async (reservation) => {
            if (!reservation) return null;

            const lesson = await Lesson.findOne({ reservation_id: reservation._id });
            if (!lesson) return null;

            const pro = reservation.pro_id;
            if (!pro) return null; // Pro 객체가 null인 경우 처리

            return {
                proName: pro.name, // 프로 이름
                lessonPlace: reservation.place, // 레슨 장소
                lessonDateTime: reservation.reservation_date, // 레슨 날짜 및 시간
                remainingSessions: reservation.remainingSessions // 남은 횟수
            };
        }));

        // null 값을 제외하고 반환
        res.json(lessons.filter(lesson => lesson !== null));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
