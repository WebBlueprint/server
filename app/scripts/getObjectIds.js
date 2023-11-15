const mongoose = require('mongoose');
require('dotenv').config();
const { User, Pro, GolfCourse } = require('../src/models/model');

async function getObjectIds() {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const user_ids = (await User.find().select('_id')).map(doc => doc._id);
        const pro_ids = (await Pro.find().select('_id')).map(doc => doc._id);
        const golfCourse_ids = (await GolfCourse.find().select('_id')).map(doc => doc._id);

        return { user_ids, pro_ids, golfCourse_ids };
    } catch (error) {
        console.error('Error fetching ObjectIds:', error);
        return null;
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = { getObjectIds };
