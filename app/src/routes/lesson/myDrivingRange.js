const express = require('express');
const router = express.Router();
const { GolfCourse, User } = require('../../models/model');

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const golfCourse = await GolfCourse.findById(user.golf_course_id);

        if (!golfCourse) {
            return res.status(404).send('Golf Course not found');
        }

        // 응답 데이터 구성
        const response = {
            googleMap: golfCourse.map_link, // 구글 맵 링크
            golfCourseName: golfCourse.name, // 골프 코스 이름
            address: golfCourse.address, // 주소
            rating: golfCourse.rating // 별점
        };

        res.json(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
