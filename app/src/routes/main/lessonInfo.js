const express = require('express');
const router = express.Router();
const { Lesson, Reservation, Pro, User, GolfCourse } = require('../../models/model');

// 유저 ID에 따른 레슨 정보를 조회하는 API
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // User 모델에서 user_id로 유저 조회
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 해당 유저의 예약 조회, 연관된 프로와 그 골프 코스 정보 포함
        const reservations = await Reservation.find({ user_id: user._id }).populate({
            path: 'pro_id',
            model: 'Pro',
            populate: {
                path: 'golf_course_id',
                model: 'GolfCourse'
            }
        });

        // 예약과 연관된 레슨 정보 조회
        const lessonsInfo = await Promise.all(reservations.map(async (reservation) => {
            if (!reservation) return null;

            const pro = reservation.pro_id;
            if (!pro || !pro.golf_course_id) return null; // Pro 객체 또는 골프 코스 정보가 없는 경우 처리

            return {
                proName: pro.name, // 프로 이름
                golfCourseName: pro.golf_course_id.name, // 골프 코스 이름
                lessonDateTime: reservation.reservation_date, // 레슨 날짜 및 시간
                remaining_lesson: reservation.remaining_lesson // 남은 횟수
            };
        }));

        res.json(lessonsInfo.filter(lesson => lesson !== null));
    } catch (error) {
        console.error('Error in getLessonInfo API:', error); // 오류 로깅
        res.status(500).send(error.message);
    }
});

module.exports = router;
