"use strict"
/* chat.js에서 socket IO를 불러와야함. */
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13){
       send();
    }
})
function send(){
    const param = {
        name: nickname.value,
        msg: chatInput.value,
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click",send)

// socket에 chatting을 보내는 기능. => 보내면 server에서 받아주는것이 있어야한다.
socket.on("chatting", (data)=>{
    
    /*
    const li = document.createElement("li");
    li.innerText = `${data.name} 님이 - ${data.msg}`
    chatList.appendChild(li);
    */
    const { name, msg, time} = data; //ES6 에서 사용가능.(데이터를 나눔)
    const item = new LiModel(name, msg, time); //LiModel을 초기화 시켜줌
    item.makeLi(); //makeLi 메소드 호출
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

// 서버에서 데이터를 받을때마다 LiModel을 계속 찍어낸다.
function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent": "received")
        const dom = `<span class="profile">
                        <span class="user">${this.name}</span>
                            <img class="image" src="https://placeimg.com/50/50/any" alt="any">
                        </span>
    
                        <span class="message">
                            ${this.msg}
                        </span>
                    
                        <span class="time">
                            ${this.time}
                        </span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    }
}