const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/user');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 7000 || process.env.PORT;

// html과 같은 정적 파일 Set 하기 
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Alisa';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
    
    // Single user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Boradcast when a user connects 
    // all of the clients except that's connecting
    // to(userinfo) 넣어서 특정 장소로 보내기
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,` ${user.username } has joined the chat`));

     // Send users and room info
     io.to(user.room).emit('roomUsers',{   
        room: user.room,
        users: getRoomUsers(user.room)
    }); 

    });

  
    // all the clients in general
    //io.emit()


    // Listen for chat Message
    socket.on('chatMessage', (msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        // user who left
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            
            // Send users and room info
            io.to(user.room).emit('roomUsers',{   
                room: user.room,
                users: getRoomUsers(user.room)
            }); 
        }

     });

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

