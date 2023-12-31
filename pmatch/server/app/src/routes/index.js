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

// 예약완료 페이지 라우트
const completedReservation = require('./completedReservation');

router.use('/completed-reservation', completedReservation);

// 세팅 페이지 라우트
const settingUserInfo = require('./setting/userInfo');
const settingMyProProfile = require('./setting/myProProfile');
const settingUserEdit = require('./setting/userEdit');
const settingChangePassword = require('./setting/changePassword');
const settingMySlot = require('./setting/mySlot');

router.use('/setting/user-info', settingUserInfo);
router.use('/setting/my-pro-profile', settingMyProProfile);
router.use('/setting/user-edit', settingUserEdit);
router.use('/setting/change-password', settingChangePassword);
router.use('/setting/my-slot', settingMySlot);

// 레슨 페이지 라우트
const myProListRouter = require('./lesson/myProList');
const makeReviewRouter = require('./lesson/makeReview');
const myDrivingRangeRouter = require('./lesson/myDrivingRange');
const groupLessonsRouter = require('./lesson/groupLessons');
const personalLessonsRouter = require('./lesson/personalLessons');
const lessonReviewsRouter = require('./lesson/lessonReviews');
const sendLessonReviewRouter = require('./lesson/sendLessonReview');

router.use('/lesson/my-pro-list', myProListRouter);
router.use('/lesson/make-review', makeReviewRouter);
router.use('/lesson/my-driving-range', myDrivingRangeRouter);
router.use('/lesson/group-lessons', groupLessonsRouter);
router.use('/lesson/personal-lessons', personalLessonsRouter);
router.use('/lesson/lesson-reviews', lessonReviewsRouter);
router.use('/lesson/send-lesson-review', sendLessonReviewRouter);

module.exports = router;
