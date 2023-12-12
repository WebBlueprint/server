const {User} = require('../models/model');

const getUserInfo = async () => {
    try {
        // 유저 정보 조회
        const users = await User.find({}, 'user_id address.coordinates gender');
        
        // 데이터 포맷팅 
        const formattedUsers = users.map(user => ({
            userId: user.user_id,
            location: user.address.coordinates, // 실제 주소로 변환 (추후작업)
            gender: user.gender
        }));

        return formattedUsers;
    } catch (error) {
        // 에러 처리
        console.error('Error in getUserInfo service:', error);
        throw error;
    }
};

module.exports = { getUserInfo };
