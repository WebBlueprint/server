const mongoose = require('mongoose');
require('dotenv').config();
const { GroupLesson, Pro, GolfCourse, User } = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function createDummyGroupLessons() {
    try {
        const pros = await Pro.find({}).select('_id');
        const proIds = pros.map(pro => pro._id);

        const courses = await GolfCourse.find({}).select('_id');
        const courseIds = courses.map(course => course._id);

        const users = await User.find({}).select('_id');
        const userIds = users.map(user => user._id);

        if (proIds.length < 3 || courseIds.length < 3 || userIds.length < 3) {
            throw new Error('Not enough pros, courses, or users to create dummy group lessons');
        }

        const groupLessons = [
            { 
                pro_id: proIds[0], 
                location: courseIds[0], 
                reservation_time: new Date(), 
                status: 'Scheduled',
                participants_count: 5,
                participants: userIds.slice(0, 5),
                remaining_lesson: 10, 
                duration: 120 
            },
            { 
                pro_id: proIds[1], 
                location: courseIds[1], 
                reservation_time: new Date(), 
                status: 'Scheduled',
                participants_count: 8,
                participants: userIds.slice(0, 8),
                remaining_lesson: 8, 
                duration: 90 
            },
            { 
                pro_id: proIds[2], 
                location: courseIds[2], 
                reservation_time: new Date(), 
                status: 'Scheduled',
                participants_count: 6,
                participants: userIds.slice(0, 6),
                remaining_lesson: 6, 
                duration: 180 
            },
        ];

        for (const lessonData of groupLessons) {
            const lesson = new GroupLesson(lessonData);
            await lesson.save();
        }

        console.log('Group lessons created successfully');
    } catch (error) {
        console.error('Error creating group lessons:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyGroupLessons();
