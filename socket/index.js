
module.exports = function(server) {

  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    console.log('user connected');
    socket.join('game');
    var clients = io.sockets.adapter.rooms['game'].length;
    console.log(clients);

    socket.on('chat message', function(msg) {
      socket.emit('chat message', msg);
      socket.broadcast.emit('chat message', msg);
    });

    socket.on('player_1 moving', function(coords) {
      socket.emit('player_1 coords', coords);
      socket.broadcast.emit('player_1 coords', coords);
    });

    socket.on('player_2 moving', function(coords) {
      socket.emit('player_2 coords', coords);
      socket.broadcast.emit('player_2 coords', coords);
    });

    socket.on('player_3 moving', function(coords) {
      socket.emit('player_3 coords', coords);
      socket.broadcast.emit('player_3 coords', coords);
    });

    socket.on('player_1 face', function(face) {
      socket.emit('player_1 face_res', face);
      socket.broadcast.emit('player_1 face_res', face);
    });

    socket.on('player_2 face', function(face) {
      socket.emit('player_2 face_res', face);
      socket.broadcast.emit('player_2 face_res', face);
    });

    socket.on('player_3 face', function(face) {
      socket.emit('player_3 face_res', face);
      socket.broadcast.emit('player_3 face_res', face);
    });

    socket.on('bomb bang', function(bomb_v) {
      socket.emit('bomb bang_res', bomb_v);
      socket.broadcast.emit('bomb bang_res', bomb_v);
    });

    socket.on('disconnect', function() {
      // clients.splice(clients.indexOf(socket), 1);
      console.log('user disconnected');
    });
    io.engine.pingTimeout = 60000;
    io.engine.pingInterval = 1000;

    io.emit('pong', {ping: 1});

    socket.emit('player id', clients);

  });

};