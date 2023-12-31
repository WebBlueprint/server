const express = require('express');
const router = express.Router();
const { Reservation, User } = require('../../models/model');

// PersonalLessons 정보를 조회하는 API
router.get('/:userId', async (req, res) => {
    try {
        // URL 파라미터에서 유저 ID 추출
        const { userId } = req.params;

        // 해당 유저 ID를 가진 유저 찾기
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 해당 유저의 개인 레슨 정보 조회
        const personalLessons = await Reservation.find({ user_id: user._id })
            .populate('pro_id', 'name') // 프로의 이름만 추출
            .populate('place', 'name'); // 장소의 이름만 추출

        // 데이터 포맷팅
        const formattedPersonalLessons = personalLessons.map(lesson => {
            return {
                proName: lesson.pro_id.name, // 프로 이름
                location: lesson.place.name, // 위치
                date: lesson.reservation_date, // 날짜
                remaining_lesson: lesson.remaining_lesson, // 남은 레슨 수
                status: lesson.status // 다가오는 레슨 여부
            };
        });

        res.json(formattedPersonalLessons);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
