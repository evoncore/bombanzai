
module.exports = function(socket) {

  socket

  .on('chat message', function(msg) {
    socket.emit('chat message', msg);
    socket.broadcast.emit('chat message', msg);
  });

}