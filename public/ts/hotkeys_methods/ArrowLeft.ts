/// <reference path="../hotkeys.ts"/>

function keyArrowLeft() {

  return {

    pressed: function() {

      if (plm_1.position.x > 0) {
        plm_1.canMove.left = true;

        if (exampleWall.blocked) {
          for (var i = 0; i < worldMap.containers.walls.children.length; i++) {
            if (plm_1.position.x != (worldMap.containers.walls.children[i].position.x + exampleWall.size) || plm_1.position.y != worldMap.containers.walls.children[i].position.y) {
            } else {
              plm_1.canMove.left = false;
            }
          }

          if (plm_1.canMove.left) {
            plm_1.position.x -= 1 * player_1.speed;
          }
        } else {
          plm_1.position.x -= 1 * player_1.speed;
        }
      }

    }

  }

}