const express = require('express');
const router = express.Router();
const {User} = require('../../models/model');

// 유저 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 유저 정보 조회
        const users = await User.find({}, 'user_id gender address photo');

        // 데이터 포맷팅 
        const formattedUsers = users.map(user => ({
            user_id: user.user_id,
            gender: user.gender,
            address: user.address,
            photo : user.photo
        }));

        res.json(formattedUsers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
