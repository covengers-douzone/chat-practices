const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';
const user = 'user';

// Run when client connects
io.on('connection', socket => {
    console.log('New WebSocket connection');

    // single client
    // welcome current user
    socket.emit('message',formatMessage(botName, 'Welcome to ChatCord!'));

    // all of the clients : Broadcast when a user connects
    socket.broadcast.emit('message',formatMessage(botName, 'A user has joined the chat'));

    // all the clients
    // io.emit();

    // Runs when client disconnects
    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botName, 'A user has left the chat'));
    });

    // Listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        io.emit('message',formatMessage(user, msg));
    })
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



