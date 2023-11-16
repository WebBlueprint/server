const express = require('express');
const router = express.Router();

const searchRoutes = require('./search');
const popularProsRoutes = require('./popularPros');

router.use('/search', searchRoutes);
router.use('/popular-pros', popularProsRoutes);

module.exports = router;
