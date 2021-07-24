### chat
1. project 생성
``` bash
    $ mkdir chat
    $ cd chat
    $ npm init -y
    $ npm i -D express
    $ npm i -D socket.io moment
    $ npm i -D nodemon 
```

2. Project Directory
<pre>
  /chat
    |--- package.json
    |--- package-lock.json
    |--- node-modules
    |--- src
    |       |--- js
    |       |     |--- chat.js
    |       |--- css
    |       |     |--- style.css  
    |       |--- index.html
    |--- app.js
</pre>

3. scripts
```
    json
{
  "name": "chat",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "express": "^4.17.1",
    "moment": "^2.29.1",
    "nodemon": "^2.0.12",
    "socket.io": "^4.1.3"
  },
  "dependencies": {}
}
```

4. 내용요약
<pre>
- 바닐라 자바스크립트로 만들어 보는 채팅앱
- socket.io 라이브러리를 사용하여 웹소켓 구현
- node js 로 웹서버 구현, express 프레임워크 사용
</pre>
