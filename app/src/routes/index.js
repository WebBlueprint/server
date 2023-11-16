const express = require('express');
const router = express.Router();

const searchRoutes = require('./search');
const popularProsRoutes = require('./popularPros');
const nearestGolfCourseRoutes = require('./nearestGolfcourse');

router.use('/search', searchRoutes);
router.use('/popular-pros', popularProsRoutes);
router.use('/nearest-golfcourse', nearestGolfCourseRoutes);

module.exports = router;
