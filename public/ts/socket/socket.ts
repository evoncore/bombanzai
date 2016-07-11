/// <reference path="../app.ts"/>

var socket = io('', {
  'reconnectionDelay': 1,
  'reconnectionAttempts': 60
});

let ul = $('#chat ul');
var form = $('#chat form');
var bombx = {
  object: null
};

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
      })
      .on('bomb coords_res', function(bomb_coords_res) {
        bombx.object = new Bomb({ x: bomb_coords_res.x, y: bomb_coords_res.y, waveLevel: 1 });
        WORLD_MAP.containers.bombs.addChild(bombx.object.model);
      })
      .on('bomb coords_remove_res', function(bomb_coords_res) {
        for (var i = 0; i < WORLD_MAP.containers.bombs.children.length; ++i) {
          if (WORLD_MAP.containers.bombs.children[i].position.x == bomb_coords_res.x &&WORLD_MAP.containers.bombs.children[i].position.y == bomb_coords_res.y) {
            WORLD_MAP.containers.bombs.removeChild(WORLD_MAP.containers.bombs.children[i]);
          }
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

  socket.on('pong', function(data) {
    var data = data;
    if (data && typeof data == 'number') {
      $('#ping span').text('ping: ' + data);
    }
  });

function sendMessage() {
  socket.emit('chat message', $('#user-message').val());
  $('#user-message').val('');
  return false;
};