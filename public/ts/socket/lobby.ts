/// <reference path="../app.ts"/>
/// <reference path="../game_ui.ts"/>
/// <reference path="socket.ts"/>

// Lobby

var connectedClients = [];
var clientJumpName;

socket

.on('client id', function(id) {

  for (var i = 0; i < id.length; i++) {
    if (socket.id == id[i]) {
      thisClientID = id[i];
    }
  }

})

// Get name
.on('client name', function(names) {

  thisClientName = names.shift().toString();

  client.id = thisClientID;
  client.name = thisClientName;

  socket.emit('object: client', client);
  socket.emit('clients name', names);

  if (client.name == 'Player_1') {
    player_1.model.control = true;
  }

  if (client.name == 'Player_2') {
    player_2.model.control = true;
  }

  if (client.name == 'Player_3') {
    player_3.model.control = true;
  }
})

// Client Connected
.on('client connected', function(client) {
  ul.append('<li class="sys-msg player-connected">' + client + ' подключился</li>');
  socket.on('chat message', function(msg) {
    ul.append('<li>' + msg + '</li>');
    // ul.append('<li><b>' + player + '</b>: ' + msg + '</li>');
  });
})

// Client Disconnected
.on('client disconnected', function(client) {
  connectedList.append('<li class="player-connected">' + client + '</li>');
  ul.append('<li class="sys-msg player-connected">' + client + ' отключился</li>');
})

.on('clients on slot player_res', function(client) {
  clientJumpName = client;
})

.on('clients on slot player (slot number)_res', function(client) {
  $('#lobby .players-list li a').eq(client).html('<i>' + clientJumpName + '</i>');
})

.on('empty slot_res', function(emptySlot) {
  if (emptySlot != null) {
    $('#lobby .players-list li').eq(emptySlot)
                                .children('a')
                                .text('Пустой слот');
  }
})

.on('clients connected list', function(clients) {
  connectedClients = clients;

  if (connectedClients.length > 0) {

    removeClientList();
    for (var i = 0; i < connectedClients.length; i++) {
      connectedList.append('<li class="player-connected">' + connectedClients[i].name + '</li>');
    }

    $('#lobby .players-list li a').on('click', function(e) {
      e.preventDefault();

      if ($(this).text() == 'Пустой слот') {

        var clientsOnSlotPlayer;
        var thisIndex = $(this).parent().index();

        if (thisClientName != '') {
          if (!($('#lobby .btn.ready').hasClass('active'))) {
            if ($(this).text() == 'Пустой слот') {
              $(this).html('<i>' + thisClientName + '</i>')
                         .parent()
                         .parent()
                         .children()
                         .eq(prevSlot)
                         .children('a')
                         .text('Пустой слот');

              socket.emit('empty slot', prevSlot);
              prevSlot = $(this).parent().index();
            }
          }
        }

        if (connectedClients) {
          removeClientList();
          removeClientFromList(clientsOnSlotPlayer, function(clientsOnSlotPlayer) {
            var cosp;

            if (clientsOnSlotPlayer) {
              cosp = clientsOnSlotPlayer;
              socket.emit('clients on slot player', cosp);
            }

            for (var i = 0; i < connectedClients.length; i++) {
              connectedList.append('<li class="player-connected">' + connectedClients[i].name + '</li>');
            }

            socket.emit('clients connected list update', connectedClients);
          });
        }

        socket.emit('clients on slot player (slot number)', thisIndex);
      }
    });
  }
})

function removeClientFromList(clientsOnSlotPlayer, callback) {

  for (var i = 0; i < connectedClients.length; i++) {
    if (connectedClients[i].name == thisClientName) {
      clientsOnSlotPlayer = connectedClients.splice(i, 1);
    }
  }

  callback(clientsOnSlotPlayer);
}

function removeClientList() {
  connectedList.remove();
  $('#lobby .connected').append('<ul></ul>');
  connectedList = $('#lobby .connected ul');
}