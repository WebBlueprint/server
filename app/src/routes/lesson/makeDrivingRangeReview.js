const express = require('express');
const router = express.Router();
const { CourseReview, GolfCourse, User } = require('../../models/model');

// 드라이빙 레인지에 대한 리뷰를 작성하는 API
router.post('/', async (req, res) => {
    try {
        const { userId, drivingRangeName, star, comment } = req.body;

        // User와 GolfCourse가 실제로 존재하는지 확인
        const user = await User.findOne({ user_id: userId });
        const golfCourse = await GolfCourse.findOne({ name: drivingRangeName });
        if (!user || !golfCourse) {
            return res.status(404).send('User or Golf Course not found');
        }

        // 새로운 리뷰 생성
        const newReview = new CourseReview({
            course_id: golfCourse._id,
            user_id: user._id,
            rating: star,
            feedback: comment
        });

        await newReview.save();

        // 성공 응답 전송
        res.status(201).send('Review submitted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
