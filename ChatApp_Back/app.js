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

io.on('connection', (socket) => {
    console.log('a user connected!');

    socket.emit('CONNECTED', socket.id);

    socket.on('SEND_MESSAGE', function(data) {
        console.log('SEND_MESSAGE event!', data);

        io.emit('MESSAGE', data);
    })
})