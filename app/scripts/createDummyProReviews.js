const mongoose = require('mongoose');
require('dotenv').config();
const { ProReview, Pro, User } = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function createDummyProReviews() {
    try {
        // 프로의 ObjectId 조회
        const pros = await Pro.find({}).select('_id');
        const proIds = pros.map(pro => pro._id);

        // 사용자의 ObjectId 조회
        const users = await User.find({}).select('_id');
        const userIds = users.map(user => user._id);

        // 더미 리뷰 데이터 생성
        const reviews = proIds.map((proId, index) => ({
            pro_id: proId,
            user_id: userIds[index % userIds.length], // 사용자 ObjectId 순환 사용
            feedback: `Review for pro ${index + 1}`,
            rating: Math.floor(Math.random() * 5) + 1, // 랜덤 평점 (1~5)
            created_date: new Date()
        }));

        // 리뷰 데이터 저장
        for (const reviewData of reviews) {
            const review = new ProReview(reviewData);
            await review.save();
        }

        console.log('Pro reviews created successfully');
    } catch (error) {
        console.error('Error creating pro reviews:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyProReviews();
