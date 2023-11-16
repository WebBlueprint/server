require('dotenv').config();
const mongoose = require('mongoose');
const {Pro} = require('../src/models/model');

// MongoDB 연결
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

const createDummyPros = async () => {
    const dummyPros = [
        { name: "홍길동", email: "pro1@example.com", password: "password1", birth_date: new Date(1980, 0, 1), gender: "male", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 180, weight: 70, phone: "010-1234-5678" },
        { name: "김프로", email: "pro2@example.com", password: "password2", birth_date: new Date(1985, 5, 15), gender: "female", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 165, weight: 60, phone: "010-2345-6789" },
        { name: "강프로", email: "pro3@example.com", password: "password3", birth_date: new Date(1990, 10, 20), gender: "male", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 175, weight: 75, phone: "010-3456-7890" },
        { name: "프로", email: "pro4@example.com", password: "password4", birth_date: new Date(1975, 2, 28), gender: "female", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 170, weight: 65, phone: "010-4567-8901" },
        { name: "김민수", email: "pro5@example.com", password: "password5", birth_date: new Date(1982, 8, 5), gender: "male", address: {type: "Point", coordinates: [127.001111, 37.564213]}, height: 182, weight: 78, phone: "010-5678-9012" }
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
