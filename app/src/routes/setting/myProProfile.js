const express = require('express');
const router = express.Router();
const {Pro} = require('../../models/model');

// 마이 프로필 정보를 업데이트하는 API
router.post('/', async (req, res) => {
    try {
        // 요청 본문에서 프로 파일 정보 추출
        const { name, email, password, birth_date, gender, address, height, weight, phone, golf_course_id } = req.body;

        // 새로운 프로 파일 정보 생성 또는 기존 정보 업데이트
        const proProfile = new Pro({
            name,
            email,
            password, // 해시 처리(추후 작업)
            birth_date,
            gender,
            address,
            height,
            weight,
            phone,
            golf_course_id
        });

        await proProfile.save();

        // 성공 응답 전송
        res.status(201).send('Pro profile updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
