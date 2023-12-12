const express = require('express');
const router = express.Router();
const {ProReview} = require('../../models/model');
const {Pro} = require('../../models/model');

// 프로 리뷰 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 모든 프로 정보 조회
        const pros = await Pro.find({});

        // 각 프로의 평균 평점 계산
        const proReviews = await Promise.all(pros.map(async (pro) => {
            const reviews = await ProReview.find({ pro_id: pro._id });
            const averageRating = reviews.length > 0
                ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
                : 0;

            return {
                proName: pro.name,
                proRating: averageRating
            };
        }));

        res.json(proReviews);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
