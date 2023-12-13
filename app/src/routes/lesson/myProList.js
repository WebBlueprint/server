const express = require('express');
const router = express.Router();
const {Pro} = require('../../models/model'); 
const {Reservation} = require('../../models/model');
const {GolfCourse} = require('../../models/model');

// My Pro List 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
                
        const userId = req.user._id; // 현재 로그인한 유저의 ID

        // 해당 유저와 관련된 예약 정보 조회
        const reservations = await Reservation.find({ user_id: userId })
            .populate({
                path: 'pro_id',
                model: 'Pro',
                populate: {
                    path: 'golf_course_id',
                    model: 'GolfCourse'
                }
            });

        // 데이터 포맷팅
        const proList = reservations.map(reservation => {
            const pro = reservation.pro_id;
            const golfCourse = pro.golf_course_id;

            return {
                proName: pro.name, // 프로 이름
                proDetailGolfCourse: golfCourse ? golfCourse.name : '', // 골프 코스 이름
                date: reservation.reservation_date, // 날짜
                time: reservation.time // 시간
            };
        });

        res.json(proList);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;