const express = require('express');
const router = express.Router();
const { ProReview, Pro, User } = require('../../models/model');

// 리뷰를 작성하는 API
router.post('/', async (req, res) => {
    try {
        const { userId, proName, star, comment } = req.body;

        // User와 Pro가 실제로 존재하는지 확인
        const user = await User.findOne({ user_id: userId });
        const pro = await Pro.findOne({ name: proName });
        if (!user || !pro) {
            return res.status(404).send('User or Pro not found');
        }

        // 새로운 리뷰 생성
        const newReview = new ProReview({
            pro_id: pro._id,
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
