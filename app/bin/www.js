"use strict";
const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });

const { createServer } = require("http")
// http 프로로콜 통해서 서버를 하나 만듦
const app = require("../app");
const httpServer = createServer(app)
const { Server } = require("socket.io")
// io라고 하는 웹소켓 서버를 만든 것

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3006",
        credentials: true,
    }
})
// io를 io.js로부터 받아옴. 
require("../src/utils/io")(io)


httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})