/// <reference path="../hotkeys.ts"/>

function keyArrowRight() {

  return {

    pressed: function() {

      if (plm_1.position.x < (game.Display.width - exampleBlock.size)) {
        plm_1.canMove.right = true;

        if (exampleWall.blocked) {
          for (var i = 0; i < worldMap.containers.walls.children.length; i++) {
            if (plm_1.position.x != (worldMap.containers.walls.children[i].position.x - exampleWall.size) || plm_1.position.y != worldMap.containers.walls.children[i].position.y) {
            } else {
              plm_1.canMove.right = false;
            }
          }

          if (plm_1.canMove.right) {
            plm_1.position.x += 1 * player_1.speed;
            player_1.camera.x += 1 * player_1.speed;
          }

          $('canvas').css({ marginLeft: -player_1.camera.x + 'px' });
          $('#game #game-display #grid').css({
            width: game.Display.width + 1 + 'px',
            top: $('canvas').css('margin-top'),
            left: $('canvas').css('left')
          });
        } else {
          plm_1.position.x += 1 * player_1.speed;
        }
      }

    }

  }

}