const express = require('express');
const router = express.Router();
const {User} = require('../../models/model');

// 유저 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 유저 정보 조회
        const users = await User.find({}, 'image user_id location gender');

        // 데이터 포맷팅 
        const formattedUsers = users.map(user => ({
            image: user.image,
            name: user.user_id,
            location: user.location,
            gender: user.gender
        }));

        res.json(formattedUsers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
