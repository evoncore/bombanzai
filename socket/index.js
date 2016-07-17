
module.exports = function(server) {

  var io = require('socket.io')(server);
  var lobbySlots = [];
  var playersName = [];
  var players = [];

  for (var i = 0; i < 8; i++) {
    playersName.push( 'Player_' + (i +  1) );
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

      for (var i = 0; i < players.length; i++) {
        for (var id in players[i]) {

          if (players[i]) {
            if (socket.id.slice(2) == players[i].id) {
              playersName.unshift(players[i].name);
              socket.broadcast.emit('player disconnected', players[i].name)
              players.splice(i, 1);
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
  socket.emit('player id', clientsArray);
  socket.emit('player name', playersName);

  socket.on('object: client', function(name) {
    players.push(name);
    console.log(players);
    var name;

    for (var i = 0; i < players.length; i++) {
      for (var id in players[i]) {

        if (players[i]) {
          if (socket.id.slice(2) == players[i].id) {
            name = players[i].name;
          }
        }
      }
    }

    socket.emit('player connected', name);
    socket.broadcast.emit('player connected', name);

    socket.emit('players connected', players);
    socket.broadcast.emit('players connected', players);
  });

  socket.on('players name', function(names) {
    playersName = names;
    console.log(playersName);
  });
  // socket
  //   .on('player in slot', function(data) {
  //     if (lobbySlots.length == 0) {
  //       lobbySlots.push(clients);
  //     } else {
  //       for (var i = 0; i < lobbySlots.length; i++) {
  //         if (lobbySlots[i] != clients) {
  //           lobbySlots.push(clients);
  //         } else {
  //           lobbySlots.splice(lobbySlots[i]);
  //         }
  //       }
  //     }

  //     socket.emit('player in slot_res', lobbySlots);
  //     socket.broadcast.emit('player in slot_res', lobbySlots);
  //   });

  });

};