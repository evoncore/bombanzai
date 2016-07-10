/// <reference path="../app.ts"/>

var socket = io('', {
  'reconnectionDelay': 1,
  'reconnectionAttempts': 60
});

let ul = $('#chat ul');
var form = $('#chat form');
var test;

form.on('submit', function(e) { e.preventDefault(); });

socket
  .on('chat message', function(msg) {
    ul.append('<li>' + msg + '</li>');
  })
  .on('connect', function() {
    ul.append('<li class="sys-msg">Соединение установлено</li>');;
    form.on('submit', sendMessage);

    socket.on('player id', function(id) {
      var num = id;

      if (id > 3) {
        id = 0;
      }

      if (id == 1) {
        player_1.model.control = true;
      }

      if (id == 2) {
        player_2.model.control = true;
      }

      if (id == 3) {
        player_3.model.control = true;
      }
    });

    socket.emit('player_1 moving', player_1.model.position);
    socket
      .on('player_1 coords', function(player_coords) {
        player_1.model.position.x = player_coords.x;
        player_1.model.position.y = player_coords.y;
      });

    socket.emit('player_2 moving', player_2.model.position);
    socket
      .on('player_2 coords', function(player_coords) {
        player_2.model.position.x = player_coords.x;
        player_2.model.position.y = player_coords.y;
      });

    socket.emit('player_3 moving', player_3.model.position);
    socket
      .on('player_3 coords', function(player_coords) {
        player_3.model.position.x = player_coords.x;
        player_3.model.position.y = player_coords.y;
      });

    socket
      .on('player_1 face_res', function(face_res) {
        player_1.model.texture = PIXI.Texture.fromImage(face_res);
      })
      .on('player_2 face_res', function(face_res) {
        player_2.model.texture = PIXI.Texture.fromImage(face_res);
      })
      .on('player_3 face_res', function(face_res) {
        player_3.model.texture = PIXI.Texture.fromImage(face_res);
      })
      .on('bomb bang_res', function(bomb_value) {
        for (let z = 0; z < objectContainers.length; z++) {
          objectContainers[z].removeChild(destroyObjects[bomb_value]);
        }
      });
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