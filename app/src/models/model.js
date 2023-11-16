"use strict";

const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    birth_date: Date,
    gender: String,
    // GeoJSON 형식으로 위치 데이터를 저장
    address: {
        type: {
            type: String, // 'Point' 고정
            enum: ['Point'], // 'address.type'은 'Point'만 가능
            required: false
        },
        coordinates: {
            type: [Number], // [경도, 위도] 형식의 배열
            required: false
        }
    },
    phone: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});

// GeoJSON 인덱스 생성
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

// Pro Schema
const proSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    birth_date: Date,
    gender: String,
    // GeoJSON 형식으로 위치 데이터 저장
    address: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
    height: Number,
    weight: Number,
    phone: String,
    golf_course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GolfCourse',
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// GeoJSON 인덱스 생성
proSchema.index({ address: '2dsphere' });

const Pro = mongoose.model('Pro', proSchema);


// Reservation Schema
const reservationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pro'
    },
    time: Date,
    reservation_date: Date,
    place: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});
const Reservation = mongoose.model('Reservation', reservationSchema);


// Lesson Schema
const lessonSchema = new mongoose.Schema({
    reservation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    },
    content: String,
    image: String,
    video: String,
    duration: Number,
    strokes: Number,
    club: String,
    feedback: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});
const Lesson = mongoose.model('Lesson', lessonSchema);


// Chat Schema
const chatSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pro'
    },
    message: String,
    sent_time: Date,
    image: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});
const Chat = mongoose.model('Chat', chatSchema);


// Golf Course Schema
const golfCourseSchema = new mongoose.Schema({
    name: String,
    // GeoJSON 형식으로 위치 데이터 저장, 필수로 설정
    address: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    map_link: String,
    phone: String,
    reviews_count: Number,
    rating: Number,
    created_date: {
        type: Date,
        default: Date.now
    }
});

// GeoJSON 인덱스 생성
golfCourseSchema.index({ address: '2dsphere' });

const GolfCourse = mongoose.model('GolfCourse', golfCourseSchema);


// Pro Review Schema
const proReviewSchema = new mongoose.Schema({
    pro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pro'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback: String,
    rating: Number,
    created_date: {
        type: Date,
        default: Date.now
    }
});
const ProReview = mongoose.model('ProReview', proReviewSchema);

// Course Review Schema
const courseReviewSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GolfCourse'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback: String,
    rating: Number,
    created_date: {
        type: Date,
        default: Date.now
    }
});
const CourseReview = mongoose.model('CourseReview', courseReviewSchema);

// Group Lesson Schema
const groupLessonSchema = new mongoose.Schema({
    pro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pro'
    },
    reservation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    },
    content: String,
    image: String,
    video: String,
    duration: Number,
    strokes: Number,
    club: String,
    feedback: String,
    participants: Number,
    created_date: {
        type: Date,
        default: Date.now
    }
});
const GroupLesson = mongoose.model('GroupLesson', groupLessonSchema);

// Group Lesson Participants Schema
const groupLessonParticipantsSchema = new mongoose.Schema({
    group_lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupLesson'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    joined_date: Date,
    status: String,
    feedback: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});
const GroupLessonParticipants = mongoose.model('GroupLessonParticipants', groupLessonParticipantsSchema);

module.exports = {
    User,
    Pro,
    Reservation,
    Lesson,
    Chat,
    GolfCourse,
    ProReview,
    CourseReview,
    GroupLesson,
    GroupLessonParticipants
};