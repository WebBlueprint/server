const express = require('express');
const router = express.Router();
const { GolfCourse, CourseReview } = require('../../models/model');

// 인기 Top 5 골프장 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 모든 골프장 정보 조회
        const golfCourses = await GolfCourse.find({});

        // 각 골프장의 평균 평점 및 위치 정보 계산
        const golfCourseDetails = await Promise.all(golfCourses.map(async (course) => {
            const reviews = await CourseReview.find({ course_id: course._id });

            return {
                courseName: course.name,
                courseLocation: course.address, // 위치 정보 추가
                courseRating: course.average_rating, // 평균 평점
                courseReviews: reviews.length // 리뷰 개수
            };
        }));

        // 평점으로 정렬하고 상위 5개만 선택
        const topGolfCourses = golfCourseDetails.sort((a, b) => b.courseRating - a.courseRating).slice(0, 5);

        res.json(topGolfCourses);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
