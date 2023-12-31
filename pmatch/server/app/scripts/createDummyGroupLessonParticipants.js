const mongoose = require('mongoose');
require('dotenv').config();
const { GroupLessonParticipants, GroupLesson, User } = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function createDummyGroupLessonParticipants() {
    try {
        const groupLessons = await GroupLesson.find({}).select('_id');
        const groupLessonIds = groupLessons.map(lesson => lesson._id);

        const users = await User.find({}).select('_id');
        const userIds = users.map(user => user._id);

        const participants = [
            { group_lesson_id: groupLessonIds[0], user_id: userIds[0], joined_date: new Date() },
            { group_lesson_id: groupLessonIds[1], user_id: userIds[1], joined_date: new Date() },
            { group_lesson_id: groupLessonIds[2], user_id: userIds[2], joined_date: new Date() },
        ];

        for (const participantData of participants) {
            const participant = new GroupLessonParticipants(participantData);
            await participant.save();
        }

        console.log('Group lesson participants created successfully');
    } catch (error) {
        console.error('Error creating group lesson participants:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyGroupLessonParticipants();
