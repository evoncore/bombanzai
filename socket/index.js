
module.exports = function(server) {

  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    console.log('user connected');

    socket.on('chat message', function(msg) {
      socket.emit('chat message', msg);
      socket.broadcast.emit('chat message', msg);
    });

    socket.on('player moving', function(coords) {
      socket.emit('player coords', coords);
      socket.broadcast.emit('player coords', coords);
    });

    socket.on('user cookie', function(cookie) {
      console.log(cookie);
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

  });

};