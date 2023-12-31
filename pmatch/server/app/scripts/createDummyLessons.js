const mongoose = require('mongoose');
require('dotenv').config();
const { Lesson, Reservation } = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function createDummyLessons() {
    try {
        const reservations = await Reservation.find({}).select('_id');
        const reservationIds = reservations.map(reservation => reservation._id);

        if (reservationIds.length === 0) {
            throw new Error('Not enough reservations to create dummy lessons');
        }

        const lessons = [

            { reservation_id: reservationIds[0], content: '스윙 개선 방법', duration: 60, strokes: 100, club: 'Driver', feedback: '좋은 진전이 있습니다!', created_date: new Date() },
            { reservation_id: reservationIds[1], content: '퍼팅 정확도 향상', duration: 45, strokes: 50, club: 'Putter', feedback: '퍼팅이 더 안정적으로 되었습니다.', created_date: new Date() },
            { reservation_id: reservationIds[2], content: '롱 게임 전략', duration: 90, strokes: 150, club: 'Iron', feedback: '거리와 정확도가 향상되었습니다.', created_date: new Date() },
            { reservation_id: reservationIds[3], content: '샌드 벙커 탈출 연습', duration: 30, strokes: 30, club: 'Wedge', feedback: '샌드 샷이 더 일관성 있어졌습니다.', created_date: new Date() },
            { reservation_id: reservationIds[4], content: '드라이브 샷 정밀도', duration: 70, strokes: 120, club: 'Driver', feedback: '드라이브 샷이 더 멀리 가게 되었습니다.', created_date: new Date() }
        ];

        for (const lessonData of lessons) {
            const lesson = new Lesson(lessonData);
            await lesson.save();
        }

        console.log('Lessons created successfully');
    } catch (error) {
        console.error('Error creating lessons:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyLessons();
