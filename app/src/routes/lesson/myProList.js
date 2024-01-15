const express = require('express');
const router = express.Router();
const {User} = require('../../models/model'); 
const {Reservation} = require('../../models/model');
const {GolfCourse} = require('../../models/model');

// My Pro List 정보를 조회하는 API
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // URL 경로에서 userId 추출

        // 먼저 사용자 정보 조회
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 사용자의 MongoDB ID를 사용하여 예약 정보 조회
        const reservations = await Reservation.find({ user_id: user._id })
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