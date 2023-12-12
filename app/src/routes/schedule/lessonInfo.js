const express = require('express');
const router = express.Router();
const { getLessonInfo } = require('../../services/getLessonInfo');

// 레슨 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        const lessonInfo = await getLessonInfo();
        res.json(lessonInfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
