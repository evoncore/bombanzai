/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/socket.ts"/>

function keyArrowLeft() {

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
            players[o].canMove.Left = true;

            for (var j = 0; j < blocked_objects.length; j++) {

              if (blocked_objects[j].blocked) {
                for (var i = 0; i < objects.length; i++) {
                  if (!(players[o].position.x != (objects[i].position.x + blocked_objects[j].size)||
                        players[o].position.y != objects[i].position.y))
                  {
                    players[o].canMove.Left = false;
                  }
                }
              } else {
                for (var i = 0; i < objects[j].children.length; i++) {
                  if (!(players[o].position.x != (objects[i].position.x + blocked_objects[j].size)||
                        players[o].position.y != objects[i].position.y))
                  {
                    players[o].canMove.Left = true;
                  }
                }
              }

            } // End main For

            if (players[o].control && players[o].canMove.Left && players[o].position.x > 0) {
              players[o].position.x -= 1 * players[o].speed;
              if (GAME.Display.scroll) {      
                players[o].camera.x -= 1 * players[o].speed;
                players[o].camera.move(players[o].camera.x, 'x');
              }
            }

            socket.emit('player_' + (o + 1) + ' moving', players[o].position);

          }   // End if -> players.controls

        }   // End Players For

      }); // End createArrays Function

    }   // End Pressed Function

  }   // End Return

}   // End Function