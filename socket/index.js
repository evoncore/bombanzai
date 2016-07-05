
var server = require('../bin/www');
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('chat message', function(msg) {
    socket.emit('chat message', msg);
    console.log(msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});