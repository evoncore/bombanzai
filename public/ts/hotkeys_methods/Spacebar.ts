/// <reference path="../hotkeys.ts"/>

function keySpacebar() {

  function checkPlayer() {
    if (WORLD_MAP.containers.players.children.length === 1) {
      player_1.alive = false;
    }
  }

  function playerPlayerAlive() {  
    if (!player_1.alive) {
      setTimeout(function() {
        alert('game over!');
        location.reload();
      }, 200);
    }
  }

  function showBombsValue(value, staticValue) {
    $('#bar span.bombs').text('bombs: ' + value + ' / ' + staticValue);
  }

  return {

    pressed: function() {

      var destroyObjects = [];
      var objectContainers = [];
      var players = [];
      var staticBombsCount = player_1.model.bombsCount;

      function createArrays(callback) {

        for (let key in WORLD_MAP.containers) {
          let push = false;

          for (let key2 in WORLD_MAP.containers[key].children) {
            if (WORLD_MAP.containers[key].children[key2].destroy) {
              push = true;
            }
          }

          for (let key3 in WORLD_MAP.containers[key].children) {
            if (push) {
              destroyObjects.push(WORLD_MAP.containers[key].children[key3]);
            }
          }
        }

        // Add Players
        for (let player_ in WORLD_MAP.containers.players.children) {
          players.push(WORLD_MAP.containers.players.children[player_]);
        }

        for (let key4 in WORLD_MAP.containers) {
          objectContainers.push(WORLD_MAP.containers[key4]);
        }

        callback();
      }

      createArrays(function() {
        for (var o = 0; o < players.length; o++) {
          if (players[o].control) {
          var currentPlayer = players[o];
          console.log(currentPlayer);

            if (players[o].bombsCount > 0) {
              // players[o].bombsCount--;
              showBombsValue(players[o].bombsCount, staticBombsCount);

              if (WORLD_MAP.containers.bombs.children.length === 0)
              {
                  bomb = new Bomb({ x: players[o].position.x, y: players[o].position.y, waveLevel: 1 });
                  WORLD_MAP.containers.bombs.addChild(bomb.model);

                if (bomb) {
                  let _firstBomb = bomb;

                  setTimeout(function() {

                    if (destroyObjects.length !== 0) {
                      for (var i = 0; i < destroyObjects.length; i++) {
                        if (
                          _firstBomb.model.position.y === (destroyObjects[i].position.y - _firstBomb.waveLevel.wave)&&
                          _firstBomb.model.position.x === destroyObjects[i].position.x ||
                          _firstBomb.model.position.y === (destroyObjects[i].position.y + _firstBomb.waveLevel.wave)&&
                          _firstBomb.model.position.x === destroyObjects[i].position.x ||
                          _firstBomb.model.position.x === (destroyObjects[i].position.x - _firstBomb.waveLevel.wave)&&
                          _firstBomb.model.position.y === destroyObjects[i].position.y ||
                          _firstBomb.model.position.x === (destroyObjects[i].position.x + _firstBomb.waveLevel.wave)&&
                          _firstBomb.model.position.y === destroyObjects[i].position.y ||
                          _firstBomb.model.position.x === destroyObjects[i].position.x &&
                          _firstBomb.model.position.y === destroyObjects[i].position.y 
                          ) {

                          // ..done ->
                          WORLD_MAP.containers.bombs.removeChild(_firstBomb.model);
                          for (let z = 0; z < objectContainers.length; z++) {
                            objectContainers[z].removeChild(destroyObjects[i]);
                          }
                          checkPlayer();
                        } else {
                          WORLD_MAP.containers.bombs.removeChild(_firstBomb.model);
                          checkPlayer();
                        }
                      }

                      playerPlayerAlive();
                    } else {
                      objectContainers[i].removeChild(_firstBomb.model);
                      checkPlayer();
                      playerPlayerAlive();
                    }

                  }, 1000);
                }
              }

              if (players[o].position.x !== bomb.model.position.x || players[o].position.y !== bomb.model.position.y)

              {
                bomb = new Bomb({ x: players[o].position.x, y: players[o].position.y, waveLevel: 1 });
                WORLD_MAP.containers.bombs.addChild(bomb.model);

                if (bomb) {
                  let _otherBomb = bomb;
                  setTimeout(function() {
                    if (destroyObjects.length !== 0) {
                      for (var i = 0; i < destroyObjects.length; i++) {
                        if (
                          _otherBomb.model.position.y === (destroyObjects[i].position.y - _otherBomb.waveLevel.wave)&&
                          _otherBomb.model.position.x === destroyObjects[i].position.x ||
                          _otherBomb.model.position.y === (destroyObjects[i].position.y + _otherBomb.waveLevel.wave)&&
                          _otherBomb.model.position.x === destroyObjects[i].position.x ||
                          _otherBomb.model.position.x === (destroyObjects[i].position.x - _otherBomb.waveLevel.wave)&&
                          _otherBomb.model.position.y === destroyObjects[i].position.y ||
                          _otherBomb.model.position.x === (destroyObjects[i].position.x + _otherBomb.waveLevel.wave)&&
                          _otherBomb.model.position.y === destroyObjects[i].position.y ||
                          _otherBomb.model.position.x === destroyObjects[i].position.x &&
                          _otherBomb.model.position.y === destroyObjects[i].position.y
                          ) {

                          // ..done ->
                          WORLD_MAP.containers.bombs.removeChild(_otherBomb.model);
                          for (let z = 0; z < objectContainers.length; z++) {
                            objectContainers[z].removeChild(destroyObjects[i]);
                          }
                          checkPlayer();
                        } else {
                          WORLD_MAP.containers.bombs.removeChild(_otherBomb.model);
                          checkPlayer();
                        }
                      }
                      playerPlayerAlive();
                    } else {
                      WORLD_MAP.containers.bombs.removeChild(_otherBomb.model);
                      checkPlayer();
                      playerPlayerAlive();
                    }
                   
                  }, 1000);
                }
              }
            }
          } // End Main If
        } // End Main For
      }); // End createArrays Function

    }

  }

}