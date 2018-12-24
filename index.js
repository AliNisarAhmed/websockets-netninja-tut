const express = require('express');
const socket = require('socket.io');

const app = express();



const server = app.listen(4000, () => {
  console.log('Listening on port 4000');
});

// static files

app.use(express.static('public'));


// Socket set up

const io = socket(server);

io.on('connection', function(socket) {   // each client will have its own 'socket' 
  console.log('made socket connection: ', socket.id);

  socket.on('chat', function(data) {
    console.log(data);
    io.sockets.emit('chat', data)
  });

  socket.on('typing', function(username) {
    socket.broadcast.emit('typing', username);
  });
});