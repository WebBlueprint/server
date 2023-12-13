const express = require('express');
const router = express.Router();
const {GolfCourse} = require('../../models/model');
const {Pro} = require('../../models/model');

// My DrivingRange 정보를 조회하는 API
router.get('/', async (req, res) => {
    try {
        // 골프 코스 정보 조회
        const golfCourses = await GolfCourse.find({});

        // 각 골프 코스에 대한 프로 리스트 조회
        const drivingRangeInfo = await Promise.all(golfCourses.map(async (course) => {
            const pros = await Pro.find({ golf_course_id: course._id });

            return {
                googleMap: course.map_link, // 구글 맵 링크
                golfCourseName: course.name, // 골프 코스 이름
                address: course.address, // 주소
                rating: course.rating, // 별점
                pros: pros.map(pro => ({ // 프로 리스트
                    proName: pro.name,
                    proDetailGolfCourse: pro.golf_course_id,
                    // 추가적인 프로 정보 필요 시 여기에 포함
                }))
            };
        }));

        res.json(drivingRangeInfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
