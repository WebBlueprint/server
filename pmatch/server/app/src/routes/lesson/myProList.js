const express = require('express');
const router = express.Router();
const { User, Pro, Reservation, GolfCourse } = require('../../models/model');

// 특정 유저의 My Pro List 정보를 조회하는 API
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // URL 파라미터에서 유저 아이디 추출

        // 해당 유저 ID를 가진 유저 찾기
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 해당 유저와 관련된 예약 정보 조회
        const reservations = await Reservation.find({ user_id: user._id })
            .populate({
                path: 'pro_id',
                model: Pro,
                populate: {
                    path: 'golf_course_id',
                    model: GolfCourse
                }
            });

        // 데이터 포맷팅
        const proList = reservations.map(reservation => {
            const pro = reservation.pro_id;
            const golfCourse = pro.golf_course_id;

            return {
                proName: pro.name, // 프로 이름
                golfCourseName: golfCourse ? golfCourse.name : '', // 골프 코스 이름
                date: reservation.reservation_date, // 날짜
            };
        });

        res.json(proList);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
