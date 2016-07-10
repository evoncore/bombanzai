/// <reference path="app.ts"/>

function createMap(callback) {
  var boxes = [
    // Player_1 zone
    new Box({ x: 40, y: 0 }),
    new Box({ x: 60, y: 0 }),
    new Box({ x: 0, y: 40 }),
    new Box({ x: 0, y: 60 }),
    new Box({ x: 0, y: 80 }),
    new Box({ x: 0, y: 100 }),
    new Box({ x: 0, y: 120 }),
    new Box({ x: 0, y: 140 }),
    new Box({ x: 20, y: 140 }),
    new Box({ x: 160, y: 120 }),
    new Box({ x: 80, y: 80 }),
    new Box({ x: 100, y: 80 }),
    new Box({ x: 100, y: 60 }),
    new Box({ x: 100, y: 100 }),
    new Box({ x: 80, y: 120 }),
    new Box({ x: 100, y: 140 }),

    // Player_2 zone
    new Box({ x: 280, y: 320 }),
    new Box({ x: 260, y: 320 }),
    new Box({ x: 320, y: 280 }),
    new Box({ x: 320, y: 260 }),
    new Box({ x: 320, y: 240 }),
    new Box({ x: 320, y: 220 }),
    new Box({ x: 320, y: 200 }),
    new Box({ x: 320, y: 180 }),
    new Box({ x: 300, y: 180 }),
    new Box({ x: 240, y: 200 }),
    new Box({ x: 240, y: 240 }),
    new Box({ x: 220, y: 180 }),
    new Box({ x: 220, y: 220 }),
    new Box({ x: 220, y: 240 }),
    new Box({ x: 220, y: 260 }),

    // Player_3 zone
    new Box({ x: 0, y: 180 }),
    new Box({ x: 0, y: 200 }),
    new Box({ x: 0, y: 220 }),
    new Box({ x: 0, y: 240 }),
    new Box({ x: 0, y: 260 }),
    new Box({ x: 0, y: 280 }),
    new Box({ x: 40, y: 320 }),
    new Box({ x: 60, y: 320 }),
    new Box({ x: 80, y: 200 }),
    new Box({ x: 100, y: 180 }),
    new Box({ x: 100, y: 220 }),
    new Box({ x: 100, y: 240 }),
    new Box({ x: 100, y: 260 }),
    new Box({ x: 80, y: 240 }),

    // Neutral zone
    new Box({ x: 320, y: 120 }),
    new Box({ x: 320, y: 140 }),
    new Box({ x: 300, y: 140 }),

    // Center
    new Box({ x: 0, y: 160 }),
    new Box({ x: 120, y: 160 }),
    new Box({ x: 160, y: 200 }),
    new Box({ x: 200, y: 160 }),
    new Box({ x: 320, y: 160 }),
  ];

  var walls = [
    // Player_1 zone
    new Wall({ x: 40, y: 20 }),
    new Wall({ x: 20, y: 40 }),
    new Wall({ x: 20, y: 60 }),
    new Wall({ x: 20, y: 120 }),
    new Wall({ x: 120, y: 20 }),
    new Wall({ x: 160, y: 20 }),
    new Wall({ x: 160, y: 40 }),
    new Wall({ x: 160, y: 60 }),
    new Wall({ x: 160, y: 80 }),
    new Wall({ x: 160, y: 100 }),
    new Wall({ x: 160, y: 140 }),
    new Wall({ x: 60, y: 60 }),
    new Wall({ x: 80, y: 60 }),
    new Wall({ x: 60, y: 80 }),
    new Wall({ x: 80, y: 100 }),
    new Wall({ x: 80, y: 140 }),
    new Wall({ x: 60, y: 100 }),

    // Player_2 zone
    new Wall({ x: 300, y: 200 }),
    new Wall({ x: 300, y: 280 }),
    new Wall({ x: 280, y: 300 }),
    new Wall({ x: 200, y: 300 }),
    new Wall({ x: 240, y: 180 }),
    new Wall({ x: 240, y: 220 }),
    new Wall({ x: 240, y: 260 }),
    new Wall({ x: 260, y: 240 }),
    new Wall({ x: 260, y: 260 }),

    // Player_3 zone
    new Wall({ x: 20, y: 280 }),
    new Wall({ x: 40, y: 300 }),
    new Wall({ x: 20, y: 200 }),
    new Wall({ x: 80, y: 180 }),
    new Wall({ x: 80, y: 220 }),
    new Wall({ x: 80, y: 260 }),
    new Wall({ x: 60, y: 240 }),
    new Wall({ x: 60, y: 260 }),
    new Wall({ x: 120, y: 300 }),

    // Neutral zone
    // 1 column
    new Wall({ x: 200, y: 20 }),
    new Wall({ x: 220, y: 20 }),
    new Wall({ x: 200, y: 40 }),
    new Wall({ x: 220, y: 40 }),
    // 2 column
    new Wall({ x: 280, y: 20 }),
    new Wall({ x: 300, y: 20 }),
    new Wall({ x: 280, y: 40 }),
    new Wall({ x: 300, y: 40 }),
    // 3 column
    new Wall({ x: 200, y: 100 }),
    new Wall({ x: 200, y: 120 }),
    new Wall({ x: 220, y: 100 }),
    new Wall({ x: 220, y: 120 }),
    // 4 column
    new Wall({ x: 280, y: 100 }),
    new Wall({ x: 280, y: 120 }),
    new Wall({ x: 300, y: 100 }),
    new Wall({ x: 300, y: 120 }),


    // Center Wall
    new Wall({ x: 160, y: 160 }),
    new Wall({ x: 140, y: 160 }),
    new Wall({ x: 100, y: 160 }),
    new Wall({ x: 80, y: 160 }),
    new Wall({ x: 60, y: 160 }),
    new Wall({ x: 40, y: 160 }),
    new Wall({ x: 20, y: 160 }),
    new Wall({ x: 160, y: 300 }),
    new Wall({ x: 160, y: 280 }),
    new Wall({ x: 160, y: 260 }),
    new Wall({ x: 160, y: 240 }),
    new Wall({ x: 160, y: 220 }),
    new Wall({ x: 160, y: 180 }),
    new Wall({ x: 180, y: 160 }),
    new Wall({ x: 220, y: 160 }),
    new Wall({ x: 240, y: 160 }),
    new Wall({ x: 260, y: 160 }),
    new Wall({ x: 280, y: 160 }),
    new Wall({ x: 300, y: 160 }),
    new Wall({ x: 160, y: 320 }),
    new Wall({ x: 160, y: 0 }),
  ];

  for (var container in WORLD_MAP.containers) {
    WORLD_MAP.map.addChild(WORLD_MAP.containers[container]);
  }

  for (var landscape in WORLD_MAP.landscape) {
    WORLD_MAP.map.addChild(WORLD_MAP.landscape[landscape]);
  }

  for (var i = 0; i < boxes.length; i++) {
    WORLD_MAP.containers.boxes.addChild(boxes[i].model);
  }

  for (var i = 0; i < walls.length; i++) {
    WORLD_MAP.containers.walls.addChild(walls[i].model);
  }

  WORLD_MAP.containers.players.addChild(player_1.model);
  WORLD_MAP.containers.players.addChild(player_2.model);
  WORLD_MAP.containers.players.addChild(player_3.model);

  callback();
}