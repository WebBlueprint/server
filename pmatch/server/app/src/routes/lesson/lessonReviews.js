const express = require('express');
const router = express.Router();
const {ProReview} = require('../../models/model');
const {Pro} = require('../../models/model');
const {User} = require('../../models/model');

// 레슨 리뷰 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
        
        // 현재 로그인한 프로의 ID를 사용
        const proId = req.user._id; // 현재 로그인한 프로의 ID

        // 해당 프로에 대한 리뷰 정보 조회
        const reviews = await ProReview.find({ pro_id: proId })
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
