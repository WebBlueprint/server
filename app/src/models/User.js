// "use strict";

// const mongoose = require('mongoose');

// const resvSchema = new mongoose.Schema({
//     date: Date,
//     proId: mongoose.Schema.Types.ObjectId,
//     location: String,
//     confirmed: Boolean
// });

// const revSchema = new mongoose.Schema({
//     date: Date,
//     content: String,
//     rating: Number,
//     proId: mongoose.Schema.Types.ObjectId
// });

// const chatSchema = new mongoose.Schema({
//     proId: mongoose.Schema.Types.ObjectId,
//     messages: [{
//         sender: String,
//         content: String,
//         timestamp: Date
//     }]
// });

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//     email: { type: String, required: true },
//     role: { type: String, enum: ['customer', 'pro'] },
//     birthDate: {
//         type: Date,
//         required: true
//     },
//     gender: {
//         type: String,
//         enum: ['male', 'female', 'other'],
//         required: true
//     },
//     isPro: {
//         type: Boolean,
//         default: false
//     },

//     // 고객 정보
//     upcomingResv: [resvSchema],
//     allResv: [resvSchema],
//     myRevs: [revSchema],
//     chats: [chatSchema],

//     // 프로 정보
//     proDetails: {
//         profileImage: String,
//         intro: String,
//         exp: Number, // 경력 (년)
//         certs: [String],
//         locs: [String]
//     },
//     confirmedResv: [resvSchema],
//     scheds: [Date], // 가능한 스케쥴
//     revsReceived: [revSchema]
// });

// module.exports = mongoose.model('User', userSchema);
