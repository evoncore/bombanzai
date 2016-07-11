/// <reference path="../hotkeys.ts"/>

function keySpacebar() {

  function showBombsValue(value, staticValue) {
    $('#bar span.bombs').text('bombs: ' + value + ' / ' + staticValue);
  }

  return {

    pressed: function() {

        for (var o = 0; o < players.length; o++) {
          if (players[o].control) {
          var currentPlayer = players[o];

            if (currentPlayer.bombsCount > 0) {
              showBombsValue(currentPlayer.bombsCount, staticBombsCount);

              if (WORLD_MAP.containers.bombs.children.length === 0)
              {
                  bomb = new Bomb({ x: currentPlayer.position.x, y: currentPlayer.position.y, waveLevel: 1 });
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
                            // findArrayValue - global function from ./functions.ts
                            socket.emit('bomb bang', findArrayValue(destroyObjects, destroyObjects[i]));
                          }
                          
                        } else {
                          WORLD_MAP.containers.bombs.removeChild(_firstBomb.model);
                        }
                      }

                      
                    } else {
                      objectContainers[i].removeChild(_firstBomb.model);
                    }

                  }, 1000);
                }
              }

              if (currentPlayer.position.x !== bomb.model.position.x || currentPlayer.position.y !== bomb.model.position.y)

              {
                bomb = new Bomb({ x: currentPlayer.position.x, y: currentPlayer.position.y, waveLevel: 1 });
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
                            // findArrayValue - global function from ./functions.ts
                            socket.emit('bomb bang', findArrayValue(destroyObjects, destroyObjects[i]));
                          }
                        } else {
                          WORLD_MAP.containers.bombs.removeChild(_otherBomb.model);
                        }
                      }
                      
                    } else {
                      WORLD_MAP.containers.bombs.removeChild(_otherBomb.model);
                    }
                  }, 1000);
                }
              }
            }
          } // End Main If
        } // End Main For

    }

  }

}