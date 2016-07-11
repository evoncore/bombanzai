/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/game.ts"/>

function keyArrowUp() {

  return {

    pressed: function() {

      var objects = [];
      var blocked_objects = [];
      var players = [];

      function createArrays(callback) {

        // Add Objects
        for (let key in WORLD_MAP.containers) {
          let push = false;

          for (let key2 in WORLD_MAP.containers[key].children) {
            if (WORLD_MAP.containers[key].children[key2]) {
              push = true;
            }
          }

          for (let key3 in WORLD_MAP.containers[key].children) {
            if (push && WORLD_MAP.containers[key].children[key3] !== 0) {
              objects.push(WORLD_MAP.containers[key].children[key3]);
            }
          }
        }

        // Add Players
        for (let player_ in WORLD_MAP.containers.players.children) {
          players.push(WORLD_MAP.containers.players.children[player_]);
        }

        // Add Blocked Objects without player
        for (let key in WORLD_MAP.containers) {
          let push = false;

          for (let key2 in WORLD_MAP.containers[key].children) {
            if (WORLD_MAP.containers[key].children[key2].blocked) {
              push = true;
            }
          }

          for (let key3 in WORLD_MAP.containers[key].children) {
            if (push && WORLD_MAP.containers[key].children[key3]._a_name != 'player') {
              blocked_objects.push(WORLD_MAP.containers[key].children[key3]);
            }
          }
        }

        callback();
      }

      createArrays(function() {

        for (var o = 0; o < players.length; o++) {
          if (players[o].control) {
            var currentPlayer = players[o];
            currentPlayer.canMove.Up = true;

            for (var j = 0; j < blocked_objects.length; j++) {

              if (blocked_objects[j].blocked) {
                for (var i = 0; i < objects.length; i++) {
                  if (!(currentPlayer.position.x != objects[i].position.x ||
                        currentPlayer.position.y != (objects[i].position.y + blocked_objects[j].size)))
                  {
                    currentPlayer.canMove.Up = false;
                  }
                }
              } else {
                for (var i = 0; i < objects[j].children.length; i++) {
                  if (!(currentPlayer.position.x != objects[i].position.x ||
                        currentPlayer.position.y != (objects[i].position.y + blocked_objects[j].size)))
                  {
                    currentPlayer.canMove.Up = true;
                  }
                }
              }

            } // End main For

            if (currentPlayer.control && currentPlayer.canMove.Up && currentPlayer.position.y > 0) {
              currentPlayer.position.y -= 1 * currentPlayer.speed;
              if (GAME.Display.scroll) {      
                currentPlayer.camera.y -= 1 * currentPlayer.speed;
                currentPlayer.camera.move(currentPlayer.camera.y, 'y');
              }
            }

            socket.emit('player_' + (o + 1) + ' face', '../img/players/player_'+(o + 1)+'/player_'+(o + 1)+'_top.png');
            socket.emit('player_' + (o + 1) + ' moving', currentPlayer.position);

          }   // End if -> players.controls

        }   // End Players For 

      }); // End createArrays Function

    }   // End Pressed Function

  }   // End Return

}   // End Function