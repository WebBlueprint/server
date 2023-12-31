require('dotenv').config();
const mongoose = require('mongoose');
const { Pro } = require('../src/models/model');

// MongoDB 연결
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

const createDummyPros = async () => {
    const dummyPros = [
        { name: "홍길동", email: "pro1@example.com", password: "password1", birth_date: new Date(1980, 0, 1), gender: "male", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 180, weight: 70, phone: "010-1234-5678", golf_course_id: "655594dac536e45817e1a6ec", reviews: ["6554a824b8a34196c39d47bf", "6554a825b8a34196c39d47c7"] },
        { name: "김프로", email: "pro2@example.com", password: "password2", birth_date: new Date(1985, 5, 15), gender: "female", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 165, weight: 60, phone: "010-2345-6789", golf_course_id: "655594dcc536e45817e1a6f2", reviews: ["6554a824b8a34196c39d47c1", "6554a825b8a34196c39d47c9"]},
        { name: "강프로", email: "pro3@example.com", password: "password3", birth_date: new Date(1990, 10, 20), gender: "male", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 175, weight: 75, phone: "010-3456-7890", golf_course_id: "655594dcc536e45817e1a6f4", reviews: ["6554a825b8a34196c39d47c3"] },
        { name: "김철수", email: "pro4@example.com", password: "password4", birth_date: new Date(1975, 2, 28), gender: "female", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 170, weight: 65, phone: "010-4567-8901", golf_course_id: "655594dcc536e45817e1a6f6", reviews: ["6554a825b8a34196c39d47c5"] },
    ];

    try {
        for (const dummyPro of dummyPros) {
            const newPro = new Pro(dummyPro);
            await newPro.save();
        }

        console.log('더미 프로 데이터가 성공적으로 생성되었습니다.');
    } catch (error) {
        console.error('더미 데이터 생성 중 오류 발생:', error);
    }
};

createDummyPros().then(() => {
    mongoose.disconnect();
});
