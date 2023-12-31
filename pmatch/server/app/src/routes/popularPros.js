const express = require('express');
const router = express.Router();
const { Pro, ProReview } = require('../models/model');

router.get('/', async (req, res) => {
    try {
        // 모든 프로의 평균 리뷰 점수와 리뷰 수 계산
        const pros = await Pro.find({});
        const proStats = await Promise.all(pros.map(async (pro) => {
            
            const reviews = await ProReview.find({ pro_id: pro._id });
            const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
            return {
                pro,
                averageRating,
                reviewCount: reviews.length
            };
        }));


        // 평균 점수와 리뷰 수를 기준으로 정렬
        const sortedPros = proStats.sort((a, b) => {
            if (b.averageRating === a.averageRating) {
                return b.reviewCount - a.reviewCount;
            }
            return b.averageRating - a.averageRating;
        });

        // 상위 5명의 프로 추출
        const topPros = sortedPros.slice(0, 5);

        res.json(topPros);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
