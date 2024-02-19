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
        { user_id : "user1", email: "user1@example.com", password: "password1", birth_date: new Date(1990, 0, 1), gender: "male", address: {type: "Point", coordinates: {lat: 37.564213, lng: 127.001111}}, phone_num: "010-1111-2222", golf_course_ids: ['659138e8315c8da6dff9851e', '655594dcc536e45817e1a6f8', '655594dcc536e45817e1a6f6'] },
        { user_id : "user2", email: "user2@example.com", password: "password2", birth_date: new Date(1992, 4, 10), gender: "female", address: {type: "Point", coordinates: {lat: 37.564213, lng: 127.001111}}, phone_num: "010-2222-3333", golf_course_ids: ['655594dcc536e45817e1a6f6'] },
        { user_id : "user3", email: "user3@example.com", password: "password3", birth_date: new Date(1985, 7, 20), gender: "male", address: {type: "Point", coordinates: {lat: 37.564213, lng: 127.001111}}, phone_num: "010-3333-4444", golf_course_ids: [] },
        { user_id : "user4", email: "user4@example.com", password: "password4", birth_date: new Date(1995, 11, 30), gender: "female", address: {type: "Point", coordinates: {lat: 37.564213, lng: 127.001111}}, phone_num: "010-4444-5555", golf_course_ids: ['655594dcc536e45817e1a6f4'] },
        { user_id : "user5", email: "user5@example.com", password: "password5", birth_date: new Date(1988, 2, 15), gender: "male", address: {type: "Point", coordinates: {lat: 37.564213, lng: 127.001111}}, phone_num: "010-5555-6666", golf_course_ids: ['655594dcc536e45817e1a6f2'] }
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
