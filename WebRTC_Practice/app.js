// Setup basic express server
const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const events = require('./event');
const port = process.env.PORT || 3000; // default port: 3000

const app = express();
const server = http.createServer(app); // use express to handle http server

const io = socket(server);
const onConnection = (socket) => {
	// Listening for joining a room (joinRoom event)
	socket.on('joinRoom', events.joinRoom(socket));
	socket.on('disconnect', () => events.leaveRoom(socket)({ room: 'general' }));

	// for peer to peer communicate
	socket.on('offer', (offer) => events.offer(socket)({ room: 'general', offer }));
	socket.on('answer', (answer) => events.answer(socket)({ room: 'general', answer }));
	socket.on('icecandidate', (candidate) => events.icecandidate(socket)({ room: 'general', candidate }));
};

io.on('connection', onConnection);
// Routing
app.use(express.static(path.join(__dirname, 'public'))); // load static resource

server.listen(port, () => {
	console.log('Server listening at port %d', port);
});
