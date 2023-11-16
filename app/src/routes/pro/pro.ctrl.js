"use strict";
const {Pro} = require('../../models/model');
const bcrypt = require('bcrypt');

const view = {
    register: (req, res) => {
        res.render("pro/register");
    },
}

const api = {
    register: async (req, res) => {
        try {
            let { email, password, birth_date, gender, address, height, weight, phone, golf_course_id } = req.body;
            golf_course_id = golf_course_id || undefined; // 빈 문자열이면 undefined로 설정

            // 이메일 중복 검사
            let pro = await Pro.findOne({ email });
            if (pro) {
                return res.status(400).json({ message: "이미 존재하는 이메일 주소입니다." });
            }

            // 비밀번호 해싱
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 주소를 GeoJSON 형식으로 변환
            let geoAddress;
            if (address && address.coordinates && address.coordinates.length === 2) {
                geoAddress = {
                    type: "Point",
                    coordinates: address.coordinates // [경도, 위도]
                };
            }

            // 데이터 저장
            pro = new Pro({
                email,
                password: hashedPassword,
                birth_date,
                gender,
                address: geoAddress, // GeoJSON 형식의 주소
                height,
                weight,
                phone,
                golf_course_id
            });
            await pro.save();

            res.status(201).json({ message: "프로가 성공적으로 등록되었습니다." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = {
    view,
    api
};