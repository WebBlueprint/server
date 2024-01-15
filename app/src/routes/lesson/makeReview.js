const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ProReview } = require('../../models/model');
const { Pro } = require('../../models/model');
const { User } = require('../../models/model');

// 리뷰를 작성하는 API
router.post('/', async (req, res) => {
    try {
        const { proName, userId, star, comment } = req.body;

        // Pro 이름과 User ID를 사용하여 각각의 ObjectId 찾기
        const pro = await Pro.findOne({ name: proName });
        const user = await User.findOne({ user_id: userId });

        if (!pro || !user) {
            return res.status(404).send('Pro or User not found');
        }

        // 새로운 리뷰 생성
        const newReview = new ProReview({
            pro_id: pro._id,  // Pro의 ObjectId 사용
            user_id: user._id, // User의 ObjectId 사용
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