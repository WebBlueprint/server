const express = require('express');
const router = express.Router();
const LessonReview = require('../../models/model');

// 레슨 리뷰를 제출하는 API
router.post('/', async (req, res) => {
    try {
        // 레슨 리뷰 정보 추출
        const { customerId, lessonId, videos, photos, comment } = req.body;

        // 새로운 레슨 리뷰 생성
        const newReview = new LessonReview({
            customer_id: customerId,
            lesson_id: lessonId,
            videos: videos,
            photos: photos,
            comment: comment
        });

        await newReview.save();

        // 성공 응답 전송
        res.status(201).send('Lesson review submitted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
