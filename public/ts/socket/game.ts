/// <reference path="../app.ts"/>
/// <reference path="../game_ui.ts"/>
/// <reference path="socket.ts"/>

form.on('submit', function(e) { e.preventDefault(); });

socket
  .on('connect', function() {

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
        var bomb = new Bomb({ x: bomb_coords_res.x, y: bomb_coords_res.y, waveLevel: 1 }, PIXI.Texture.fromImage(bomb_coords_res.bombImg));
        WORLD_MAP.containers.bombs.addChild(bomb.model);
      })
      // remove bomb
      .on('bomb coords_remove_res', function(bomb_remove_coords_res) {
        for (var i = 0; i < WORLD_MAP.containers.bombs.children.length; i++) {
          if (WORLD_MAP.containers.bombs.children[i].position.x == bomb_remove_coords_res.x &&
              WORLD_MAP.containers.bombs.children[i].position.y == bomb_remove_coords_res.y)
          {
            WORLD_MAP.containers.bombs.removeChild(WORLD_MAP.containers.bombs.children[i]);
          }
        }
      })
      .on('pause_res', function(paused_res) {
        if (paused_res == 'paused') {
          $('#game').addClass(paused_res);
          GAME.status = paused_res;
          gamePaused();
        } else if (paused_res == 'running') {
          GAME.status = paused_res;
          gameContinue();
        }
      })
  })

// show ping
socket.on('pong', function(data) {
  var data = data;
  if (data && typeof data == 'number') {
    $('#ping span').text('ping: ' + data);
  }
});