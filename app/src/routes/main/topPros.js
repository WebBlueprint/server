const express = require('express');
const router = express.Router();
const { Pro, ProReview } = require('../../models/model');

// 인기 Top 5 프로 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 모든 프로 정보 조회, 골프 코스의 이름만 포함
        const pros = await Pro.find({}).populate('golf_course_id', 'name');

        // 각 프로의 세부 정보 및 평균 평점 계산
        const proDetails = await Promise.all(pros.map(async (pro) => {
            const reviews = await ProReview.find({ pro_id: pro._id }).populate('user_id', 'name'); // 사용자 이름 포함
            const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

            return {
                proId: pro._id,
                proName: pro.name,
                proEmail: pro.email,
                proGender: pro.gender,
                golfCourseName: pro.golf_course_id ? pro.golf_course_id.name : null,
                proRating: averageRating, // 평균 평점
                proReviews: reviews.length, // 리뷰 개수
                reviews: reviews.map(review => ({ // 리뷰의 자세한 내용
                    userId: review.user_id._id,
                    userName: review.user_id.name, // 사용자 이름
                    feedback: review.feedback,
                    rating: review.rating,
                    createdDate: review.created_date
                }))
            };
        }));

        // 평점으로 정렬하고 상위 5명만 선택
        const topPros = proDetails.sort((a, b) => b.proRating - a.proRating).slice(0, 5);

        res.json(topPros);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
