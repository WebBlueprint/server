const mongoose = require('mongoose');
require('dotenv').config();
const { GroupLesson, Pro, GolfCourse } = require('../src/models/model');

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

        if (proIds.length < 5 || courseIds.length < 5) {
            throw new Error('Not enough pros or courses to create dummy group lessons');
        }

        const groupLessons = [
            { pro_id: proIds[0], course_id: courseIds[0], title: 'Beginner Golf Clinic', description: 'Learn the basics of golf.', max_participants: 10, date: new Date(), duration: 120 },
            { pro_id: proIds[1], course_id: courseIds[1], title: 'Intermediate Skills Workshop', description: 'Improve your swing and putting.', max_participants: 8, date: new Date(), duration: 90 },
            { pro_id: proIds[2], course_id: courseIds[2], title: 'Advanced Golf Strategies', description: 'For experienced players looking to refine their game.', max_participants: 6, date: new Date(), duration: 180 },
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
