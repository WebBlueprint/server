require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const AWS = require('aws-sdk');

// AWS 지역 설정
// AWS.config.update({ region: 'ap-northeast-2' });
// const secretsManager = new AWS.SecretsManager();

const app = express();
const PORT = process.env.PORT || 3000;

// async function getSecret(secretName) {
//     try {
//         const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
//         if (data.SecretString) {
//             return data.SecretString;
//         }
//     } catch (error) {
//         console.error('Error retrieving secret:', error);
//     }
// }

// SECRET_KEY 로딩
// (async function() {
//     process.env.SECRET_KEY = await getSecret('MyAppSecretKey');
// })();

// MongoDB 연결
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

app.use(cors());  
app.use(express.json());

// 라우터 설정
const userRoutes = require('./routes/userRoutes');
const proRoutes = require('./routes/proRoutes');

app.use('/user', userRoutes);
app.use('/pro', proRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
