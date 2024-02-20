const express = require('express');
const router = express.Router();
const { User, Reservation, Lesson } = require('../../models/model');

// 특정 유저의 특정 날짜 예약에 대한 레슨 정보 조회 API
router.post('/', async (req, res) => {
    try {
        const { userId, reservationDate, reservationTime } = req.body;

        // 날짜와 시간을 조합하여 ISO 8601 형식으로 변환
        const dateTime = new Date(`${reservationDate}T${reservationTime}:00.000+00:00`);

        // User 모델에서 userId로 사용자 찾기
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 해당 유저의 ObjectId를 사용하여 해당 날짜의 예약 찾기
        const reservation = await Reservation.findOne({
            user_id: user._id,
            reservation_date: new Date(dateTime)
        });
        if (!reservation) {
            return res.status(404).send('Reservation not found for the given user and date');
        }

        // 해당 예약에 대한 레슨 정보 찾기
        const lesson = await Lesson.findOne({ reservation_id: reservation._id });
        if (!lesson) {
            return res.status(404).send('Lesson not found for the given reservation');
        }

        // 레슨 ID 반환
        res.status(200).json({ lessonId: lesson._id });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
