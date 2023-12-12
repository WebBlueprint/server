const express = require('express');
const router = express.Router();
const {GolfCourse} = require('../../models/model');
const {CourseReview} = require('../../models/model');

// 인기 Top 5 골프장 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 모든 골프장 정보 조회
        const golfCourses = await GolfCourse.find({});

        // 각 골프장의 평균 평점 계산
        const golfCourseRatings = await Promise.all(golfCourses.map(async (course) => {
            const reviews = await CourseReview.find({ course_id: course._id });
            const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

            return {
                courseName: course.name,
                courseRating: averageRating || 0, // 리뷰가 없는 경우 0으로 처리
                courseReviews: reviews.length
            };
        }));

        // 평점으로 정렬하고 상위 5개만 선택
        const topGolfCourses = golfCourseRatings.sort((a, b) => b.courseRating - a.courseRating).slice(0, 5);

        res.json(topGolfCourses);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
