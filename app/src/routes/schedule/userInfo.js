const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../../services/userService');

router.get('/', async (req, res) => {
    try {
        const userInfo = await getUserInfo();
        res.json(userInfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
