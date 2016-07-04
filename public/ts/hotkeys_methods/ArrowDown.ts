/// <reference path="../hotkeys.ts"/>

function keyArrowDown() {

  return {

    pressed: function() {

      if (plm_1.position.y < (game.Display.height - exampleBlock.size)) {

        plm_1.canMove.Down = true;

        if (exampleWall.blocked) {
          for (var i = 0; i < worldMap.containers.walls.children.length; i++) {
            if (plm_1.position.x != worldMap.containers.walls.children[i].position.x || plm_1.position.y != (worldMap.containers.walls.children[i].position.y - exampleWall.size)) {
            } else {
              plm_1.canMove.Down = false;
            }
          }

          if (plm_1.canMove.Down) {
            plm_1.position.y += 1 * player_1.speed;
            player_1.camera.y += 1 * player_1.speed;
          }

          $('canvas').css({ marginTop: -player_1.camera.y + 'px' });
          $('#game #game-display #grid').css({
            width: game.Display.width + 1 + 'px',
            top: $('canvas').css('margin-top'),
            left: $('canvas').css('left')
          });
        } else {
          plm_1.position.y += 1 * player_1.speed;
        }

      }

    }

  }

}