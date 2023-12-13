const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ProReview } = require('../../models/model');
const { Pro } = require('../../models/model');
const { User } = require('../../models/model');

// 리뷰를 작성하는 API
router.post('/', async (req, res) => {
    try {
        const { proId, userId, star, comment } = req.body;

        // proId와 userId가 유효한 ObjectId인지 확인
        if (!mongoose.Types.ObjectId.isValid(proId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid Pro ID or User ID');
        }

        // Pro와 User가 실제로 존재하는지 확인
        const proExists = await Pro.findById(proId);
        const userExists = await User.findById(userId);
        if (!proExists || !userExists) {
            return res.status(404).send('Pro or User not found');
        }

        // 새로운 리뷰 생성
        const newReview = new ProReview({
            pro_id: proId,
            user_id: userId,
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
