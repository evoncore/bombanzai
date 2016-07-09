/// <reference path="../app.ts"/>

var socket = io('', {
  'reconnectionDelay': 1,
  'reconnectionAttempts': 2
});

let ul = $('#chat ul');
var form = $('#chat form');

form.on('submit', function(e) { e.preventDefault(); });

socket
  .on('chat message', function(msg) {
    ul.append('<li>' + msg + '</li>');
  })
  .on('connect', function() {
    ul.append('<li class="sys-msg">Соединение установлено</li>');;
    form.on('submit', sendMessage);

    socket.emit('player moving', player_1.model.position);
    socket
      .on('player coords', function(player_coords) {
        player_1.model.position.x = player_coords.x;
        player_1.model.position.y = player_coords.y;
      });

    socket.emit('user cookie', document.cookie);
    console.log(document.cookie);
  })
  .on('disconnect', function() {
    ul.append('<li class="sys-msg">Соединение потеряно</li>');;
    form.on('submit', function(e) { e.preventDefault(); });
  })
  .on('reconnect_failed', function() {
    ul.append('<li class="sys-msg">Соединение закрыто</li>');;
  })

function sendMessage() {
  socket.emit('chat message', $('#user-message').val());
  $('#user-message').val('');
  return false;
};