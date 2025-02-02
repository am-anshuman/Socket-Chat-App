var socket = io();

let btn = document.getElementById('send-btn');
let inputMsg = document.getElementById('new-msg');
let msgList = document.getElementById('msg-list');

btn.onclick = function exec() {
    socket.emit('msg_send', {
        msg: inputMsg.value
    })
}

socket.on('msg_rcvd', (data) => {
    let liMsg = document.createElement('li');
    liMsg.innerText = data.msg;
    msgList.appendChild(liMsg);
})