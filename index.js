const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const dobble = require('./dobble.js');
const app = express();
const server = createServer(app);
// const io = new Server(server);
const path = require('path');

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


app.use(express.static(path.join(__dirname, 'frontend')));

const PORT=3003

server.listen(PORT, () => {
    console.log("server running at http://localhost:{PORT}");
});

const rooms = [];

io.set
io.on('connection', (socket) => {
    console.log("connection")
    socket.on('create-room', (roomName) => {
        rooms[roomName] = {
            players: {},
            deck: dobble.generateDobbleDeck(7), // returns and array of cards, each card is represented by an array of unique numbers
            currentCard: null // Current card in the middle of the screen
        };
        socket.join(roomName);
        console.log("create-room")
    });

    socket.on('join-room', (roomName, playerName) => {
        if (rooms[roomName]) {
            rooms[roomName].players[socket.id] = {
                name: playerName,
                score: 0
            };
            socket.join(roomName);
            io.to(roomName).emit('update-players', rooms[roomName].players);
        }
    });

    socket.on('start-game', (roomName) => {
        if (rooms[roomName]) {
            rooms[roomName].currentCard = rooms[roomName].deck.pop();
            io.to(roomName).emit('new-card', rooms[roomName].currentCard);
        }
    });

    socket.on('symbol-click', (iconName) => {
        console.log("symbol-click " + iconName)
        // if (rooms[roomName]) {
        //     console.log("symbol-click" + roomName)
        //     // rooms[roomName].currentCard = rooms[roomName].deck.pop();
        //     // io.to(roomName).emit('new-card', rooms[roomName].currentCard);
        // }
    });

    socket.on('match-found', (roomName, card) => {
        if (rooms[roomName]) {
            rooms[roomName].players[socket.id].score += 1;
            rooms[roomName].currentCard = rooms[roomName].deck.pop();
            io.to(roomName).emit('update-players', rooms[roomName].players);
            io.to(roomName).emit('new-card', rooms[roomName].currentCard);
        }
    });
});
