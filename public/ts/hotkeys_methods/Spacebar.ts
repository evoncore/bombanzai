/// <reference path="../hotkeys.ts"/>

function keySpacebar() {

  return {

    pressed: function() {

      if (worldMap.containers.bombs.children.length == 0) {
        bomb = new Bomb(PIXI.Texture.fromImage('../img/bomb.png'), plm_1.position.x, plm_1.position.y);
        worldMap.containers.bombs.addChild(bomb.model);

        if (bomb) {
          let _firstBomb = bomb;
          setTimeout(function(){
            worldMap.containers.bombs.removeChild(_firstBomb.model);
          }, 1000);
        }
      } else if (plm_1.position.x != bomb.model.position.x || plm_1.position.y != bomb.model.position.y) {
        bomb = new Bomb(PIXI.Texture.fromImage('../img/bomb.png'), plm_1.position.x, plm_1.position.y);
        worldMap.containers.bombs.addChild(bomb.model);

        if (bomb) {
          let _otherBomb = bomb;
          setTimeout(function(){
            worldMap.containers.bombs.removeChild(_otherBomb.model);
          }, 1000);
        }
      }

    }

  }

}