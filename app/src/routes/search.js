const express = require('express');
const router = express.Router();
const { Pro, GolfCourse } = require('../models/model');

router.get('/', async (req, res) => {
    try {
        const query = req.query.searchQuery;
        
        const proResults = await Pro.find({ name: { $regex: query, $options: 'i' } });
        const courseResults = await GolfCourse.find({ name: { $regex: query, $options: 'i' } });

        const combinedResults = [...proResults, ...courseResults];
        res.json(combinedResults);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
