'use strict';
const app = require('./app');
const ee = require('./socket.js');
const db = require('../db');
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; //allow outside access

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(PORT, '0.0.0.0', '', () => {
  console.log(`Example app listening on port ${PORT}!`);
});

io.on('connection', (socket) => {
  console.log('====socket connected on', socket.id);

  socket.on('room', function(room) {
    socket.join(room);
  });

  ee.on('delta', function(delta) {
    console.log('=======emitting delta to', delta.email);
    io.sockets.in(delta.email).emit('delta', delta);
  });
});