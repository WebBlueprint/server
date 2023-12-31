const express = require('express');
const router = express.Router();
const {Pro} = require('../../models/model');

router.post('/:proId', async (req, res) => {
    try {
        const { proId } = req.params; // URL 파라미터에서 proId 추출
        const slotSetting = req.body; // 요청 본문에서 슬롯 설정 추출

        // 해당 프로 ID를 가진 프로 찾기
        const pro = await Pro.findById(proId);
        if (!pro) {
            return res.status(404).send('Pro not found');
        }

        pro.slot = slotSetting;

        await pro.save();
        res.status(201).send('Slot settings updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
