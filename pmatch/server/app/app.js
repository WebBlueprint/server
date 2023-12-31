"use strict";

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan') // 로그 확인을 위한 라이브러리

const app = express();

// MongoDB 연결
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

// 라우팅
const user = require("./src/routes/user")
const pro = require("./src/routes/pro")
const routes  = require("./src/routes")

// 앱 세팅
app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'ejs'); // EJS 템플릿 엔진 사용

// 미들 웨어 등록
app.use(cors());  
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", user);
app.use("/", pro);
app.use('/', routes);

module.exports = app;