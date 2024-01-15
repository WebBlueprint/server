const express = require('express');
const router = express.Router();
const {GroupLesson} = require('../../models/model');
const {Pro} = require('../../models/model');
const {User} = require('../../models/model');
const {Reservation} = require('../../models/model');

// GroupLessons 정보를 조회하는 API
router.get('/:userId', async (req, res) => {
    try {
        const user_Id = req.params.userId; // URL 경로에서 userId 추출

        // 먼저 사용자 정보 조회
        const user = await User.findOne({ user_id: user_Id });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // 해당 유저와 관련된 그룹 레슨 정보 조회
        const groupLessons = await GroupLesson.find({ 'participants.user_id': user })
            .populate('pro_id')
            .populate('reservation_id');

        // 데이터 포맷팅
        const formattedGroupLessons = groupLessons.map(lesson => {
            const pro = lesson.pro_id;
            const reservation = lesson.reservation_id;

            return {
                groupName: pro.name, // 그룹 이름 (프로 이름을 사용)
                location: reservation.place, // 위치
                date: reservation.reservation_date, // 날짜
                time: reservation.time, // 시간
                remainingLessons: reservation.remainingSessions, // 남은 레슨 수
                upcoming: true // 다가오는 레슨 여부
                // 추가적인 정보 필요 시 여기에 포함
            };
        });

        res.json(formattedGroupLessons);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
