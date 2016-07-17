/// <reference path="../app.ts"/>
/// <reference path="../game_ui.ts"/>
/// <reference path="socket.ts"/>

// Lobby

var connectedPlayers = [];

socket

// players id -> players_controller.ts
.on('player id', function(id) {

  for (var i = 0; i < id.length; i++) {
    if (socket.id == id[i]) {
      thisPlayerID = id[i];
    }
  }

})

// Get name
.on('player name', function(names) {

  thisPlayerName = names.shift().toString();

  client.id = thisPlayerID;
  client.name = thisPlayerName;

  socket.emit('object: client', client);
  socket.emit('players name', names);
})

// Player leave from slot
// .on('player leave from slot', function(data) {
//   $('#lobby .players-list li a').eq(data - 1).text('Пустой слот');
// })

// Player Connected
.on('player connected', function(player) {
  ul.append('<li class="sys-msg player-connected">' + player + ' подключился</li>');
  socket.on('chat message', function(msg) {
    ul.append('<li>' + msg + '</li>');
    // ul.append('<li><b>' + player + '</b>: ' + msg + '</li>');
  });
})

// Player Disconnected
.on('player disconnected', function(player) {
  connectedList.append('<li class="player-connected">' + player + '</li>');
  ul.append('<li class="sys-msg player-connected">' + player + ' отключился</li>');
})

.on('players connected', function(players) {
  connectedPlayers = players;
  connectedList.remove();
  $('#lobby .connected').append('<ul></ul>');
  connectedList = $('#lobby .connected ul');
  for (var i = 0; i < connectedPlayers.length; i++) {
    connectedList.append('<li class="player-connected">' + connectedPlayers[i].name + '</li>');
  }
})

// socket.emit('player in slot', null);
// socket
//   .on('player in slot_res', function(data) {
//     console.log(data)
//     for (var i = 0; i < data.length; i++) {
//       $('#lobby .connected ul').append('<li>' + (playerNames[(data[i] - 1)]) + '</li>');
//     }
//     for (var i = 0; i < $('#lobby .players-list li a').length; i++) {
//       if ($('#lobby .players-list li a').eq(i).text() != 'Пустой слот') {
//         prevSlot = i;
//       }
//     }
//   })