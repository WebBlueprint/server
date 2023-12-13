const express = require('express');
const router = express.Router();
const {Lesson} = require('../../models/model');
const {Pro} = require('../../models/model');
const {Reservation} = require('../../models/model');

// PersonalLessons 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
        
        // 현재 로그인한 유저의 ID를 사용
        const userId = req.user._id; // 현재 로그인한 유저의 ID

        // 해당 유저와 관련된 개인 레슨 정보 조회
        const personalLessons = await Lesson.find({ 'reservation_id.user_id': userId })
            .populate({
                path: 'reservation_id',
                populate: {
                    path: 'pro_id',
                    model: 'Pro'
                }
            });

        // 데이터 포맷팅
        const formattedPersonalLessons = personalLessons.map(lesson => {
            const reservation = lesson.reservation_id;
            const pro = reservation.pro_id;

            return {
                proName: pro.name, // 프로 이름
                location: reservation.place, // 위치
                date: reservation.reservation_date, // 날짜
                time: reservation.time, // 시간
                remainingLessons: reservation.remainingSessions, // 남은 레슨 수
                upcoming: true // 다가오는 레슨 여부
                // 추가적인 정보 필요 시 여기에 포함
            };
        });

        res.json(formattedPersonalLessons);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
