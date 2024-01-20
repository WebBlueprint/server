const express = require('express');
const router = express.Router();
const {ProReview} = require('../../models/model');
const {Pro} = require('../../models/model');
const {User} = require('../../models/model');

// 레슨 리뷰 정보를 조회하는 API
router.get('/:proId', async (req, res) => {
    try {
        // URL 파라미터에서 프로 ID 추출
        const { proId } = req.params;

        // 해당 프로 ID를 가진 프로 찾기
        const pro = await Pro.findOne({ pro_id: proId });
        if (!pro) {
            return res.status(404).send('User not found');
        }

        // 해당 프로에 대한 리뷰 정보 조회
        const reviews = await ProReview.find({ pro_id: pro })
            .populate('user_id', 'name'); // 유저 이름 포함

        // 데이터 포맷팅
        const formattedReviews = reviews.map(review => {
            return {
                customer: review.user_id.name, // 고객 이름
                rating: review.rating, // 별점
                comment: review.feedback, // 코멘트
                date: review.created_date // 리뷰 날짜
                // 추가적인 정보 필요 시 여기에 포함
            };
        });

        res.json(formattedReviews);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
