const express = require('express');
const router = express.Router();
const { Pro } = require('../../models/model');

// 특정 프로 파일의 일부 정보를 업데이트하는 API
router.post('/:id', async (req, res) => {
    const proId = req.params.id;
    const { career, curriculum, photo, golf_course_id, review } = req.body;

    try {
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

        // 해당 ID의 프로 파일 찾기 및 업데이트
        const updatedProfile = await Pro.findByIdAndUpdate(proId, { $set: updateData }, { new: true });

        if (!updatedProfile) {
            return res.status(404).send('Pro profile not found');
        }

        // 성공 응답 전송
        res.status(200).send('Pro profile updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
