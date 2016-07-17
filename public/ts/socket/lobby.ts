/// <reference path="../app.ts"/>
/// <reference path="../game_ui.ts"/>
/// <reference path="socket.ts"/>

// Lobby

var connectedClients = [];

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

.on('clients connected', function(clients) {
  connectedClients = clients;

  removeClientList();
  for (var i = 0; i < connectedClients.length; i++) {
    connectedList.append('<li class="player-connected">' + connectedClients[i].name + '</li>');
  }

  $('#lobby .players-list li a').on('click', function(e) {
    e.preventDefault();

    if (connectedClients) {
      removeClientList();
      removeClientFromList(function() {
        for (var i = 0; i < connectedClients.length; i++) {
          connectedList.append('<li class="player-connected">' + connectedClients[i].name + '</li>');
        }

        socket.emit('clients connected update', connectedClients);
      });
    }

  });
})

function removeClientFromList(callback) {
  for (var i = 0; i < connectedClients.length; i++) {
    if (connectedClients[i].name == thisClientName) {
      connectedClients.splice(i, 1);
    }
  }
  callback();
}

function removeClientList() {
  connectedList.remove();
  $('#lobby .connected').append('<ul></ul>');
  connectedList = $('#lobby .connected ul');
}