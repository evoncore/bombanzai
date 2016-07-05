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


var socket = io();

$('#chat form').submit(function() {
  socket.emit('chat message', $('#user-message').val());
  $('#user-message').val('');
  return false;
});

let ul = $('#chat ul');

socket.on('chat message', function(msg) {
  ul.append('<li>' + msg + '</li>');
});