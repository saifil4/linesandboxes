const express = require('express');
const app = express();
const http = require('http')
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);


let games = [];

app.post('/createGame', (req, res) => {
    const { gameName, maxPlayers } = req.body;
    const newGame = {
        id: games.length + 1,
        name: gameName,
        maxPlayers,
        players: []
    };
    games.push(newGame);
    io.emit('gameCreated', newGame);
    res.status(201).send(newGame);
});

app.post('/joinGame', (req, res) => {
    const { gameId, player } = req.body;
    const game = games.find(g => g.id === gameId);
    if (!game) {
        res.status(404).send({ message: 'Game not found' });
    } else if (game.players.length >= game.maxPlayers) {
        res.status(400).send({ message: 'Game is full' });
    } else {
        game.players.push(player);
        io.emit('gameUpdated', game);
        res.status(200).send(game);
    }
});


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    })
})

// io.on('connection', (socket) => {
//     socket.on('joinGame', (gameId) => {
//         socket.join(gameId);
//     });

//     socket.on('leaveGame', (gameId) => {
//         socket.leave(gameId);
//     });

//     socket.on('send_message', (gameId, message) => {
//         io.to(gameId).emit('receiveMessage', message);
//     });
// });

server.listen(8080, () => {
    console.log('Sever is running.')
})





const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let games = [];

app.use(express.json());

app.post('/createGame', (req, res) => {
    const { gameName, maxPlayers } = req.body;
    const newGame = {
        id: games.length + 1,
        name: gameName,
        maxPlayers,
        players: []
    };
    games.push(newGame);
    res.status(201).send(newGame);
});

io.on('connection', (socket) => {
    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        socket.broadcast.to .emit('joinedGame', gameId);
    });

    socket.on('leaveGame', (gameId) => {
        socket.leave(gameId);
    });

    socket.on('sendMessage', (gameId, message) => {
        io.to(gameId).emit('receiveMessage', message);
    });
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});