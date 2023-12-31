const mongoose = require('mongoose');
require('dotenv').config();
const { CourseReview, GolfCourse, User } = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function createDummyCourseReviews() {
    try {
        const courses = await GolfCourse.find({}).select('_id');
        const courseIds = courses.map(course => course._id);

        const users = await User.find({}).select('_id');
        const userIds = users.map(user => user._id);

        if (courseIds.length < 5 || userIds.length < 5) {
            throw new Error('Not enough courses or users to create dummy course reviews');
        }

        const courseReviews = [
            { course_id: courseIds[0], user_id: userIds[0], rating: 5, comment: 'Excellent course!', created_date: new Date() },
            { course_id: courseIds[1], user_id: userIds[1], rating: 4, comment: 'Great experience, but a bit crowded.', created_date: new Date() },
            { course_id: courseIds[2], user_id: userIds[2], rating: 3, comment: 'Good course, but needs maintenance.', created_date: new Date() },
            { course_id: courseIds[3], user_id: userIds[3], rating: 5, comment: 'Outstanding facilities and scenery!', created_date: new Date() },
            { course_id: courseIds[4], user_id: userIds[4], rating: 4, comment: 'Very enjoyable, will visit again.', created_date: new Date() }
        ];

        for (const reviewData of courseReviews) {
            const review = new CourseReview(reviewData);
            await review.save();
        }

        console.log('Course reviews created successfully');
    } catch (error) {
        console.error('Error creating course reviews:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyCourseReviews();
