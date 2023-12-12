const express = require('express');
const router = express.Router();
const {Pro} = require('../../models/model');
const {ProReview} = require('../../models/model'); 


// 인기 Top 5 프로 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 모든 프로 정보 조회
        const pros = await Pro.find({});

        // 각 프로의 평균 평점 계산
        const proRatings = await Promise.all(pros.map(async (pro) => {
            const reviews = await ProReview.find({ pro_id: pro._id });
            const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

            return {
                proName: pro.name,
                proRating: averageRating || 0, // 리뷰가 없는 경우 0으로 처리
                proReviews: reviews.length
            };
        }));

        // 평점으로 정렬하고 상위 5명만 선택
        const topPros = proRatings.sort((a, b) => b.proRating - a.proRating).slice(0, 5);

        res.json(topPros);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
