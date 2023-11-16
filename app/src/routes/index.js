const express = require('express');
const router = express.Router();

const searchRoutes = require('./search');

router.use('/search', searchRoutes);

module.exports = router;
