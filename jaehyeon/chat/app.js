const express = require('express');
const http = require('http') // node 코어 모듈
const app = express();
const path = require('path') //NodeJS의 기본 module
                             // -> 운영체제마다 /, \의 구분이 다르기 때문에 사용함.
const server = http.createServer(app) // express server 가 http를 통해서 실행되도록 만들어주는것.

const socketIO = require('socket.io');
const io = socketIO(server) // socketIO에 server를 담아서 만들어줌
const moment = require("moment");

app.use(express.static(path.join(__dirname, "src")));

const PORT = process.env.PORT || 5000;

io.on("connection", (socket)=>{
    // chat.js 에서 보내는 메시지를 받음
    socket.on("chatting", (data) => {
        console.log(data);
        const {name, msg } = data;
        
        io.emit("chatting", {
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:mm A")
        })
    })

    console.log("연결이 이루어 졌습니다.");
}) //connection이 이루어지면 connection 대한 모든 정보(객체)들을 socket에 담음

server.listen(PORT, ()=> console.log(`server is running ${PORT}`));
