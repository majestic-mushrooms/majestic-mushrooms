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
  console.log('socket connected!');
  
  ee.on('delta', (id, delta) => {
    console.log('=======EMITTING DELTA=======');
    socket.broadcast.to(id).emit('delta', delta);
  });
});