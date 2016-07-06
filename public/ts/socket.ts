/// <reference path="app.ts"/>

// for typescript
declare var io : {
  connect(url: string): Socket;
}
interface Socket {
  on(event: string, callback: (data: any) => void );
  emit(event: string, data: any);
}
// end declare

var socket = io('', {
  'reconnection delay': 1,
  'reconnectionAttempts': 10
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
});