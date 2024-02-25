"use strict";

require('dotenv').config({ path: "./.env" });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan') // 로그 확인을 위한 라이브러리
const cookieParser = require('cookie-parser');

const app = express();

// MongoDB 연결
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

// 라우팅
const user = require("./src/routes/user")
const pro = require("./src/routes/pro")
const routes = require("./src/routes")

// 앱 세팅
app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'ejs'); // EJS 템플릿 엔진 사용

// 미들 웨어 등록
app.use(cors({
    credentials: true,
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(express.static(`${__dirname}/src/public`));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", user);
app.use("/", pro);
app.use('/', routes);

module.exports = app;