
module.exports = function(server) {

  var io = require('socket.io')(server);
  var lobbySlots = [];
  var clientsName = [];
  var connectedClients = [];

  // For UI playersConnected List
  var clientsList = connectedClients;
  var clientsOnSlotPlayer = [];

  for (var i = 0; i < 8; i++) {
    clientsName.push( 'Player_' + (i +  1) );
  }

  io.on('connection', function(socket) {
    console.log('user connected');
    socket.join('game');
    var clients = Object.keys(io.sockets.clients().adapter.rooms['game'].sockets);
    var clientsArray = [];

    for (var i = 0; i < clients.length; i++) {
      clientsArray[i] = clients[i].slice(2);
    }

    require('./chat.js')(socket);

    socket

    // Players coords
    .on('player_1 moving', function(coords) {
      socket.emit('player_1 coords', coords);
      socket.broadcast.emit('player_1 coords', coords);
    })

    .on('player_2 moving', function(coords) {
      socket.emit('player_2 coords', coords);
      socket.broadcast.emit('player_2 coords', coords);
    })

    .on('player_3 moving', function(coords) {
      socket.emit('player_3 coords', coords);
      socket.broadcast.emit('player_3 coords', coords);
    })

    // Передать массив Players
    // ...??????????????????????????????????
    // Players facez
    .on('player_1 face', function(face) {
      socket.emit('player_1 face_res', face);
      socket.broadcast.emit('player_1 face_res', face);
    })

    .on('player_2 face', function(face) {
      socket.emit('player_2 face_res', face);
      socket.broadcast.emit('player_2 face_res', face);
    })

    .on('player_3 face', function(face) {
      socket.emit('player_3 face_res', face);
      socket.broadcast.emit('player_3 face_res', face);
    })
    // ...??????????????????????????????????

    // Show bomb effects
    .on('bomb bang', function(bomb_v) {
      socket.emit('bomb bang_res', bomb_v);
      socket.broadcast.emit('bomb bang_res', bomb_v);
    })

    // Show bomb
    .on('bomb coords', function(bomb_coords) {
      socket.broadcast.emit('bomb coords_res', bomb_coords);
    })

    // Remove Bomb
    .on('bomb coords_remove', function(bomb_coords) {
      socket.emit('bomb coords_remove_res', bomb_coords);
      socket.broadcast.emit('bomb coords_remove_res', bomb_coords);
    })

    // Pause
    .on('pause', function(paused) {
      socket.emit('pause_res', paused);
      socket.broadcast.emit('pause_res', paused);
    })

    // Disconnect
    .on('disconnect', function() {
      console.log('user disconnected');

      for (var i = 0; i < connectedClients.length; i++) {
        for (var id in connectedClients[i]) {

          if (connectedClients[i]) {
            if (socket.id.slice(2) == connectedClients[i].id) {
              clientsName.unshift(connectedClients[i].name);
              socket.broadcast.emit('player disconnected', connectedClients[i].name)
              connectedClients.splice(i, 1);
            }
          }
        }
      }

    // socket.emit('player leave from slot', clientsArray);
    // socket.broadcast.emit('player leave from slot', clientsArray);
  });

  // Ping to Client
  io.engine.pingInterval = 1000;
  io.emit('pong', {ping: 1});


  //===================================//
  //               LOBBY               //
  //===================================//

  // Player ID
  socket.emit('client id', clientsArray);
  socket.emit('client name', clientsName);

  socket.on('object: client', function(name) {
    connectedClients.push(name);
    console.log(connectedClients);
    var name;

    for (var i = 0; i < connectedClients.length; i++) {
      for (var id in connectedClients[i]) {

        if (connectedClients[i]) {
          if (socket.id.slice(2) == connectedClients[i].id) {
            name = connectedClients[i].name;
          }
        }
      }
    }

    socket.emit('client connected', name);
    socket.broadcast.emit('client connected', name);

    socket.emit('clients connected', clientsList);
    socket.broadcast.emit('clients connected', clientsList);
  });

  socket.on('clients connected update', function(connectedClients) {
    clientsList = connectedClients;

    socket.emit('clients connected', clientsList);
    socket.broadcast.emit('clients connected', clientsList);
  });

  socket.on('clients name', function(names) {
    clientsName = names;
    console.log(clientsName);
  });

  });

};