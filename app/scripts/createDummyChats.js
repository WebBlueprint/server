const mongoose = require('mongoose');
require('dotenv').config();
const { Chat, Pro, User } = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function createDummyChats() {
    try {
        const pros = await Pro.find({}).select('_id');
        const proIds = pros.map(pro => pro._id);

        const users = await User.find({}).select('_id');
        const userIds = users.map(user => user._id);

        if (proIds.length === 0 || userIds.length === 0) {
            throw new Error('Not enough pros or users to create dummy chats');
        }

        const chats = [
            { sender: proIds[0], receiver: userIds[0], message: 'Hello!', created_at: new Date() },
            {
                sender: proIds[0],
                receiver: userIds[0],
                message: "Hi, I'm interested in booking a lesson.",
                timestamp: new Date()
            },
            {
                sender: proIds[0],
                receiver: userIds[0],
                message: "Sure, I'd be happy to help you improve your golf skills.",
                timestamp: new Date()
            },
        ];

        for (const chatData of chats) {
            const chat = new Chat(chatData);
            await chat.save();
        }

        console.log('Dummy chats created successfully');
    } catch (error) {
        console.error('Error creating dummy chats:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyChats();