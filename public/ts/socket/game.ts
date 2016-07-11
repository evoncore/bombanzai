/// <reference path="../app.ts"/>

var socket = io('', {
  'reconnectionDelay': 1,
  'reconnectionAttempts': 60
});

var ul = $('#chat ul');
var form = $('#chat form');

form.on('submit', function(e) { e.preventDefault(); });

socket
  .on('chat message', function(msg) {
    ul.append('<li>' + msg + '</li>');
  })
  .on('connect', function() {

    // players id
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

    // players coords
    for (var o = 0; o < players.length; o++) {
      socket.emit('player_' + (o + 1) + ' moving', players[o].position);
      (function() {
        var _o_ = o;
        socket.on('player_' + (o + 1) + ' coords', function(player_coords) {
          players[_o_].position.x = player_coords.x;
          players[_o_].position.y = player_coords.y;
        });
        socket.on('player_' + (o + 1) + ' face_res', function(face_res) {
          players[_o_].texture = PIXI.Texture.fromImage(face_res);
        });
      })();
    }

    socket
      // show bomb effects
      .on('bomb bang_res', function(bomb_value) {
        for (let z = 0; z < objectContainers.length; z++) {
          objectContainers[z].removeChild(destroyObjects[bomb_value]);
        }
      })
      // show bomb
      .on('bomb coords_res', function(bomb_coords_res) {
        var bomb = new Bomb({ x: bomb_coords_res.x, y: bomb_coords_res.y, waveLevel: 1 });
        WORLD_MAP.containers.bombs.addChild(bomb.model);
      })
      // remove bomb
      .on('bomb coords_remove_res', function(bomb_remove_coords_res) {
        for (var i = 0; i < WORLD_MAP.containers.bombs.children.length; ++i) {
          if (WORLD_MAP.containers.bombs.children[i].position.x == bomb_remove_coords_res.x &&
              WORLD_MAP.containers.bombs.children[i].position.y == bomb_remove_coords_res.y)
          {
            WORLD_MAP.containers.bombs.removeChild(WORLD_MAP.containers.bombs.children[i]);
          }
        }
    });
  })

// show ping
socket.on('pong', function(data) {
  var data = data;
  if (data && typeof data == 'number') {
    $('#ping span').text('ping: ' + data);
  }
});