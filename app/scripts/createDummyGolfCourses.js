const mongoose = require('mongoose');
require('dotenv').config();
const { GolfCourse } = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function createDummyGolfCourses() {
    try {
        const golfCourses = [
            { name: 'Emerald Greens', address: '123 Golf Rd, Golfville', map_link: 'http://maps.example.com/emerald', phone: '123-456-7890', reviews_count: 50, rating: 4.5 },
            { name: 'Sunnyvale Links', address: '456 Sunny St, Sunnycity', map_link: 'http://maps.example.com/sunnyvale', phone: '987-654-3210', reviews_count: 35, rating: 4.2 },
            { name: 'Oakwood Club', address: '789 Oak Ave, Oaktown', map_link: 'http://maps.example.com/oakwood', phone: '555-123-4567', reviews_count: 40, rating: 4.7 },
            { name: 'Pine Valley Resort', address: '321 Pine Ln, Pinecity', map_link: 'http://maps.example.com/pinevalley', phone: '555-987-6543', reviews_count: 60, rating: 4.8 },
            { name: 'Riverbend Golf', address: '654 River Rd, Rivercity', map_link: 'http://maps.example.com/riverbend', phone: '555-678-1234', reviews_count: 45, rating: 4.3 },
            { name: 'Mountain Peak Golf & Country Club', address: '987 Mountain Rd, Mountainville', map_link: 'http://maps.example.com/mountainpeak', phone: '555-654-7890', reviews_count: 55, rating: 4.6 }
        ];

        for (const courseData of golfCourses) {
            const course = new GolfCourse(courseData);
            await course.save();
        }

        console.log('Golf courses created successfully');
    } catch (error) {
        console.error('Error creating golf courses:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyGolfCourses();
