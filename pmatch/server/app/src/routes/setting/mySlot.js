const express = require('express');
const router = express.Router();
const Pro = require('../../models/model');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    try {
        const { proId, ...slotSettings } = req.body;

        // proId가 유효한 ObjectId인지 확인
        if (!mongoose.Types.ObjectId.isValid(proId)) {
            return res.status(400).send('Invalid Pro ID');
        }

        // 해당 프로 ID를 가진 프로 찾기
        const pro = await Pro.findById(proId);
        if (!pro) {
            return res.status(404).send('Pro not found');
        }

        // 슬롯 설정 정보 업데이트

        await pro.save();
        res.status(201).send('Slot settings updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
