const express = require('express');
const router = express.Router();

const searchRoutes = require('./search');
const popularProsRoutes = require('./popularPros');
const nearestGolfCourseRoutes = require('./nearestGolfcourse');

// 기존 라우트
router.use('/search', searchRoutes);
router.use('/popular-pros', popularProsRoutes);
router.use('/nearest-golfcourse', nearestGolfCourseRoutes);

// 메인 페이지 라우트
const mainUserInfo = require('./main/userInfo');
const mainLessonInfo = require('./main/lessonInfo');
const topPros = require('./main/topPros');
const topGolfCourses = require('./main/topGolfCourses');

router.use('/main/user-info', mainUserInfo);
router.use('/main/lesson-info', mainLessonInfo);
router.use('/main/top-pros', topPros);
router.use('/main/top-golfcourses', topGolfCourses);

// 스케쥴 페이지 라우트
const scheduleUserInfo = require('./schedule/userInfo');
const scheduleLessonInfo = require('./schedule/lessonInfo');
const proReviewRoutes = require('./schedule/proReview');

router.use('/schedule/user-info', scheduleUserInfo);
router.use('/schedule/lesson-info', scheduleLessonInfo);
router.use('/schedule/pro-reviews', proReviewRoutes);

module.exports = router;
