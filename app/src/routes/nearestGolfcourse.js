const express = require('express');
const router = express.Router();
const { GolfCourse, User } = require('../models/model');

router.get('/', async (req, res) => {
    try {
        // 예시로 사용자 ID를 쿼리 파라미터로 받음
        const userId = req.query.userId;

        // 해당 사용자의 위치 정보 가져오기
        const user = await User.findById(userId);
        if (!user || !user.address) {
            return res.status(404).send('사용자 위치 정보가 없습니다.');
        }

        // 가장 가까운 골프장 찾기
        const nearestGolfCourse = await GolfCourse.findOne({
            'address': {
                $near: {
                    $geometry: user.address,
                    $maxDistance: 100000 // 10km 이내의 골프장 검색
                }
            }
        });
        console.log(nearestGolfCourse);
        if (!nearestGolfCourse) {
            return res.status(404).send('근처에 골프장이 없습니다.');
        }

        res.json(nearestGolfCourse);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
