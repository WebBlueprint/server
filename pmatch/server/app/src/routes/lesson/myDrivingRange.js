const express = require('express');
const router = express.Router();
const { GolfCourse, Pro } = require('../../models/model');

// 특정 프로의 골프 코스 정보를 조회하는 API
router.get('/:proId', async (req, res) => {
    try {
        const proId = req.params.proId; // URL 파라미터에서 프로의 사용자 정의 ID 추출

        // 사용자 정의 ID를 가진 프로 찾기
        const pro = await Pro.findOne({ pro_id: proId });
        if (!pro) {
            return res.status(404).send('Pro not found');
        }

        // 프로가 속한 골프 코스 정보 조회
        const golfCourse = await GolfCourse.findById(pro.golf_course_id);
        if (!golfCourse) {
            return res.status(404).send('Golf Course not found');
        }

        // 응답 데이터 구성
        const response = {
            googleMap: golfCourse.map_link, // 구글 맵 링크
            golfCourseName: golfCourse.name, // 골프 코스 이름
            address: golfCourse.address, // 주소
            rating: golfCourse.rating, // 별점
            proInfo: { // 프로 정보
                proName: pro.name,
                proDetailGolfCourse: pro.golf_course_id
                // 추가적인 프로 정보 필요 시 여기에 포함
            }
        };

        res.json(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
