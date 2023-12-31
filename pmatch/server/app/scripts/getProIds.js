const mongoose = require('mongoose');
require('dotenv').config();
const {Pro} = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function getProIds() {
    try {
        const pros = await Pro.find({}).select('_id');
        console.log('Pro IDs:', pros);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
}

getProIds();
