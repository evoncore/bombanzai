/// <reference path="app.ts"/>

function createMap(callback) {
  var Boxes = [
    // Player_1 zone
    { x: 40, y: 0 },
    { x: 60, y: 0 },
    { x: 0, y: 40 },
    { x: 0, y: 60 },
    { x: 0, y: 80 },
    { x: 0, y: 100 },
    { x: 0, y: 120 },
    { x: 0, y: 140 },
    { x: 20, y: 140 },
    { x: 160, y: 120 },
    { x: 80, y: 80 },
    { x: 100, y: 80 },
    { x: 100, y: 60 },
    { x: 100, y: 100 },
    { x: 80, y: 120 },
    { x: 100, y: 140 },

    // Player_2 zone
    { x: 280, y: 320 },
    { x: 260, y: 320 },
    { x: 320, y: 280 },
    { x: 320, y: 260 },
    { x: 320, y: 240 },
    { x: 320, y: 220 },
    { x: 320, y: 200 },
    { x: 320, y: 180 },
    { x: 300, y: 180 },
    { x: 240, y: 200 },
    { x: 240, y: 240 },
    { x: 220, y: 180 },
    { x: 220, y: 220 },
    { x: 220, y: 240 },
    { x: 220, y: 260 },

    // Player_3 zone
    { x: 0, y: 180 },
    { x: 0, y: 200 },
    { x: 0, y: 220 },
    { x: 0, y: 240 },
    { x: 0, y: 260 },
    { x: 0, y: 280 },
    { x: 40, y: 320 },
    { x: 60, y: 320 },
    { x: 80, y: 200 },
    { x: 100, y: 180 },
    { x: 100, y: 220 },
    { x: 100, y: 240 },
    { x: 100, y: 260 },
    { x: 80, y: 240 },

    // Neutral zone
    { x: 320, y: 120 },
    { x: 320, y: 140 },
    { x: 300, y: 140 },

    // Center
    { x: 0, y: 160 },
    { x: 120, y: 160 },
    { x: 160, y: 200 },
    { x: 200, y: 160 },
    { x: 320, y: 160 },
  ];

  var Walls = [
    // Player_1 zone
    { x: 40, y: 20 },
    { x: 20, y: 40 },
    { x: 20, y: 60 },
    { x: 20, y: 120 },
    { x: 120, y: 20 },
    { x: 160, y: 20 },
    { x: 160, y: 40 },
    { x: 160, y: 60 },
    { x: 160, y: 80 },
    { x: 160, y: 100 },
    { x: 160, y: 140 },
    { x: 60, y: 60 },
    { x: 80, y: 60 },
    { x: 60, y: 80 },
    { x: 80, y: 100 },
    { x: 80, y: 140 },
    { x: 60, y: 100 },

    // Player_2 zone
    { x: 300, y: 200 },
    { x: 300, y: 280 },
    { x: 280, y: 300 },
    { x: 200, y: 300 },
    { x: 240, y: 180 },
    { x: 240, y: 220 },
    { x: 240, y: 260 },
    { x: 260, y: 240 },
    { x: 260, y: 260 },

    // Player_3 zone
    { x: 20, y: 280 },
    { x: 40, y: 300 },
    { x: 20, y: 200 },
    { x: 80, y: 180 },
    { x: 80, y: 220 },
    { x: 80, y: 260 },
    { x: 60, y: 240 },
    { x: 60, y: 260 },
    { x: 120, y: 300 },

    // Neutral zone
    // 1 column
    { x: 200, y: 20 },
    { x: 220, y: 20 },
    { x: 200, y: 40 },
    { x: 220, y: 40 },
    // 2 column
    { x: 280, y: 20 },
    { x: 300, y: 20 },
    { x: 280, y: 40 },
    { x: 300, y: 40 },
    // 3 column
    { x: 200, y: 100 },
    { x: 200, y: 120 },
    { x: 220, y: 100 },
    { x: 220, y: 120 },
    // 4 column
    { x: 280, y: 100 },
    { x: 280, y: 120 },
    { x: 300, y: 100 },
    { x: 300, y: 120 },


    // Center wall
    { x: 160, y: 160 },
    { x: 140, y: 160 },
    { x: 100, y: 160 },
    { x: 80, y: 160 },
    { x: 60, y: 160 },
    { x: 40, y: 160 },
    { x: 20, y: 160 },
    { x: 160, y: 300 },
    { x: 160, y: 280 },
    { x: 160, y: 260 },
    { x: 160, y: 240 },
    { x: 160, y: 220 },
    { x: 160, y: 180 },
    { x: 180, y: 160 },
    { x: 220, y: 160 },
    { x: 240, y: 160 },
    { x: 260, y: 160 },
    { x: 280, y: 160 },
    { x: 300, y: 160 },
    { x: 160, y: 320 },
    { x: 160, y: 0 },
  ];

  // Create Containers
  for (var container in WORLD_MAP.containers) {
    WORLD_MAP.map.addChild(WORLD_MAP.containers[container]);
  }

  for (var landscape in WORLD_MAP.landscape) {
    WORLD_MAP.map.addChild(WORLD_MAP.landscape[landscape]);
  }

  // Create Boxes
  for (var i = 0; i < Boxes.length; i++) {
    WORLD_MAP.containers.boxes.addChild(new Box(Boxes[i]).model);
  }

  // Create Walls
  for (var i = 0; i < Walls.length; i++) {
    WORLD_MAP.containers.walls.addChild(new Wall(Walls[i]).model);
  }

  // Create Players
  WORLD_MAP.containers.players.addChild(player_1.model);
  WORLD_MAP.containers.players.addChild(player_2.model);
  WORLD_MAP.containers.players.addChild(player_3.model);

  callback();
}