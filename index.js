const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

/**
 * '/' -> It is the Route Path. It means the static files will be served when accessing the root URL (/).
 * express.static() -> built-in middleware in Express that serves static files.
 */
app.use('/', express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    socket.on('msg_send', (data) => {
        console.log(data);

        /**
         * io.emit() is for all the web-socket connections that exists within the web-socket server
         */
        io.emit('msg_rcvd', data);

        /**
         * socket.emit() is for the same client that sent the event. It is only going to receive it and the rest won't.
         */
        // socket.emit('msg_rcvd', data);

        /**
         * In socket.broadcast.emit(), except for the sender, everyone else is going to receive the msg.
         */
        // socket.broadcast.emit('msg_rcvd', data);
    })
})

server.listen(3000, () => {
    console.log('Server started at PORT 3000');
})