const mongoose = require('mongoose');
require('dotenv').config();
const {User} = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function getUserIds() {
    try {
        const users = await User.find({}).select('_id');
        console.log('User IDs:', users);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
}

getUserIds();
