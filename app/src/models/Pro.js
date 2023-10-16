"use strict";

const mongoose = require('mongoose');

const resvSchema = new mongoose.Schema({
    date: Date,
    customerId: mongoose.Schema.Types.ObjectId,
    location: String,
    confirmed: Boolean
});

const revSchema = new mongoose.Schema({
    date: Date,
    content: String,
    rating: Number,
    customerId: mongoose.Schema.Types.ObjectId
});

const chatSchema = new mongoose.Schema({
    customerId: mongoose.Schema.Types.ObjectId,
    messages: [{
        sender: String,
        content: String,
        timestamp: Date
    }]
});

const proSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    profileImage: String,
    
    // 프로 정보
    intro: String,
    exp: Number, // 경력 (년)
    certs: [String],
    locs: [String],
    confirmedResv: [resvSchema],
    scheds: [Date], // 가능한 스케쥴
    revsReceived: [revSchema],
    chats: [chatSchema]
});

module.exports = mongoose.model('Pro', proSchema);
