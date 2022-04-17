// Setup basic express server
const express = require('express');
const path = require('path');
const http = require('http')
const socket = require('socket.io')
const port = process.env.PORT || 3000; // default port: 3000

const app = express();
const server = http.createServer(app) // use express to handle http server

const io = socket(server);
const onConnection = (socket) => {
  console.log('Socket.io init success')
};

io.on("connection", onConnection);
// Routing
app.use(express.static(path.join(__dirname, 'public'))); // load static resource

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});