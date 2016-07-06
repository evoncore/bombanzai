
module.exports = function(server) {

  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    console.log('user connected');

    socket.on('chat message', function(msg) {
      socket.emit('chat message', msg);
      socket.broadcast.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

  });

};