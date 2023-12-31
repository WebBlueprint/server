const express = require('express');
const router = express.Router();
const { Pro } = require('../../models/model');

// 특정 프로의 프로필 정보를 업데이트하는 API
router.post('/:proId', async (req, res) => {
    const proId = req.params.proId; // URL 파라미터에서 프로의 사용자 정의 ID 추출
    const { career, curriculum, photo, golf_course_id, review } = req.body;

    try {
        // 해당 사용자 정의 ID를 가진 프로 찾기
        const pro = await Pro.findOne({ pro_id: proId });
        if (!pro) {
            return res.status(404).send('Pro not found');
        }

        // 유효한 업데이트 내용만 포함시키기
        const updateData = {};
        if (career !== undefined && career !== "") updateData.career = career;
        if (curriculum !== undefined && curriculum !== "") updateData.curriculum = curriculum;
        if (photo && photo.length > 0) updateData.photo = photo;
        if (golf_course_id !== undefined && golf_course_id !== "") updateData.golf_course_id = golf_course_id;
        if (review && review.length > 0) updateData.review = review;

        // 업데이트 내용이 비어있으면 오류 응답
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send('No valid update information provided');
        }

        // 해당 프로의 프로필 업데이트
        await Pro.updateOne({ user_id: proId }, { $set: updateData });

        // 성공 응답 전송
        res.status(200).send('Pro profile updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
