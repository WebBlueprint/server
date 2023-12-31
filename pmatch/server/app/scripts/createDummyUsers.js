require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../src/models/model');

// MongoDB 연결
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

const createDummyUsers = async () => {
    const dummyUsers = [
        { user_id : "user1", email: "user1@example.com", password: "password1", birth_date: new Date(1990, 0, 1), gender: "male", address: {type: "Point", coordinates: [127.001111, 37.564213]}, phone: "010-1111-2222", photo_url: "https://example.com/photos/user1.jpg" },
        { user_id : "user2", email: "user2@example.com", password: "password2", birth_date: new Date(1992, 4, 10), gender: "female", address: {type: "Point", coordinates: [127.001111, 37.564213]}, phone: "010-2222-3333", photo_url: "https://example.com/photos/user2.jpg" },
        { user_id : "user3", email: "user3@example.com", password: "password3", birth_date: new Date(1985, 7, 20), gender: "male", address: {type: "Point", coordinates: [127.001111, 37.564213]}, phone: "010-3333-4444", photo_url: "https://example.com/photos/user3.jpg" },
        { user_id : "user4", email: "user4@example.com", password: "password4", birth_date: new Date(1995, 11, 30), gender: "female", address: {type: "Point", coordinates: [127.001111, 37.564213]}, phone: "010-4444-5555", photo_url: "https://example.com/photos/user4.jpg" },
        { user_id : "user5", email: "user5@example.com", password: "password5", birth_date: new Date(1988, 2, 15), gender: "male", address: {type: "Point", coordinates: [127.001111, 37.564213]}, phone: "010-5555-6666", photo_url: "https://example.com/photos/user5.jpg" }
    ];

    try {
        for (const dummyUser of dummyUsers) {
            const newUser = new User(dummyUser);
            await newUser.save();
        }

        console.log('더미 사용자 데이터가 성공적으로 생성되었습니다.');
    } catch (error) {
        console.error('더미 데이터 생성 중 오류 발생:', error);
    }
};

createDummyUsers().then(() => {
    mongoose.disconnect();
});
