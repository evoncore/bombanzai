/// <reference path="app.ts"/>

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
  .on('player moving', function(player_coords) {
    
  })
  .on('connect', function() {
    ul.append('<li class="sys-msg">Соединение установлено</li>');;
    form.on('submit', sendMessage);

    // socket.emit('player moving', function() {
      
    // });
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