const express = require('express');
const router = express.Router();
const { Reservation } = require('../../models/model');

// 예약 재조정 API
router.post('/', async (req, res) => {
    try {
        const { reservationId, newDate, newTime } = req.body;
        
        // 해당 예약 찾기
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).send('Reservation not found');
        }

        // 새로운 날짜와 시간으로 업데이트
        reservation.reservation_date = new Date(newDate + ' ' + newTime);

        await reservation.save();

        res.status(200).send('Reservation rescheduled successfully');
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
