const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');


// Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", {username, room});


// Message from server
socket.on('message', message => {
    outputMessage(message);

    // Scroll down 
    chatMessage.scrollTop=chatMessage.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = "",
    e.target.elements.msg.focus();
});

// Output message to DOM
// message -> object so,  need to change from 'string' to 'object'
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
     ${message.text}
    </p>`;
    
  document.querySelector('.chat-messages').appendChild(div);
};