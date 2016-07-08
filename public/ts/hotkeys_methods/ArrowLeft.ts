/// <reference path="../hotkeys.ts"/>

function keyArrowLeft() {

  return {

    pressed: function() {

      var objects = [];
      var blocked_objects = [];

      player_1.canMove.Left = true;

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
            if (push && WORLD_MAP.containers[key].children[key3] != 0) {
              objects.push(WORLD_MAP.containers[key].children[key3]);
            }
          }
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

        for (var j = 0; j < blocked_objects.length; j++) {

          if (blocked_objects[j].blocked) {
            for (var i = 0; i < objects.length; i++) {
              if (!(player_1.model.position.x != (objects[i].position.x + blocked_objects[j].size) ||
                    player_1.model.position.y != objects[i].position.y))
              {
                player_1.canMove.Left = false;
              }
            }
          } else {
            for (var i = 0; i < objects[j].children.length; i++) {
              if (!(player_1.model.position.x != (objects[i].position.x + blocked_objects[j].size) ||
                    player_1.model.position.y != objects[i].position.y))
              {

                player_1.canMove.Left = true;
              }
            }
          }

        } // End main For

        if (player_1.canMove.Left && player_1.model.position.x > 0) {
          player_1.model.position.x -= 1 * player_1.speed;
          if (GAME.Display.scroll) {      
            player_1.camera.x -= 1 * player_1.speed;
            player_1.camera.move(player_1.camera.x, 'x');
          }
        }

      });

    }

  }

}