/// <reference path="../hotkeys.ts"/>

function keyArrowUp() {

  return {

    pressed: function() {

      if (plm_1.position.y > 0) {

        plm_1.canMove.Up = true;

        if (exampleWall.blocked) {
          for (var i = 0; i < worldMap.containers.walls.children.length; i++) {
            if (plm_1.position.x != worldMap.containers.walls.children[i].position.x || plm_1.position.y != (worldMap.containers.walls.children[i].position.y + exampleWall.size)) {
            } else {
              plm_1.canMove.Up = false;
            }
          }

          if (plm_1.canMove.Up) {
            plm_1.position.y -= 1 * player_1.speed;
          }
        } else {
          plm_1.position.y -= 1 * player_1.speed;
        }

      }
    }

  }

}