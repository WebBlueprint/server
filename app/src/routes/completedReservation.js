const express = require('express');
const router = express.Router();
const {Lesson} = require('../models/model');
const {Reservation} = require('../models/model');
const {Pro} = require('../models/model');

// 예약완료 페이지의 레슨 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 레슨 정보 조회
        const lessons = await Lesson.find({})
            .populate({
                path: 'reservation_id',
                populate: {
                    path: 'pro_id',
                    model: 'Pro'
                }
            });

        // 데이터 포맷팅
        const formattedLessons = lessons.map(lesson => {
            const reservation = lesson.reservation_id;
            const pro = reservation.pro_id;

            // Pro 객체가 null인 경우를 처리
            if (!pro) {
                return null; // 또는 적절한 기본값 설정
            }

            return {
                proName: pro.name, // 프로 이름
                lessonPlace: reservation.place, // 레슨 장소
                lessonDateTime: reservation.time, // 레슨 날짜 및 시간
                remainingSessions: reservation.remainingSessions // 남은 횟수
            };
        });

        // null 값을 제외하고 반환
        const filteredFormattedLessons = formattedLessons.filter(lesson => lesson !== null);

        res.json(filteredFormattedLessons);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
