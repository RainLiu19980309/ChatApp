import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const port = process.env.PORT || 3000; 

// tell the server to listen for incoming connections
httpServer.listen(port, () => {
    console.log(`app is running on ${port}`);
})

// the socket.io stuff will go here - manage incoming connections, sending notifications, managing users, and managing chat messages

// io is the connection manager/switchboard operator - it has access to ALL connections to the chat server and can manage them, broadcast events to everyone, assign IDs etc

// socket is the individual connection to that server - when you join the chat, you're the socket. You can emit an event on the client side (socket) that gets caught on the server side (io) - a message, a typing event, a connection/disconnection event etc. io manages all of those events and can broadcast them to everyone connected to the server

io.on('connection', (socket) => {
    console.log('a user connected!');

    socket.emit('CONNECTED', socket.id);

    socket.on('SEND_MESSAGE', function(data) {
        console.log('SEND_MESSAGE event!', data);

        io.emit('MESSAGE', data);
    })

    socket.on('USER_TYPING', (data) => {
        io.emit('SOMEONE_TYPING', data);
    })
})