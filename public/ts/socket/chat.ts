/// <reference path="socket.ts"/>

socket
  .on('connect', function() {
    ul.append('<li class="sys-msg">Соединение установлено</li>');
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
};