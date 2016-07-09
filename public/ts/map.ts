/// <reference path="app.ts"/>

var wall_1 = new Wall({ x: 80,  y: 40  });
var wall_2 = new Wall({ x: 160, y: 60  });
var wall_3 = new Wall({ x: 100, y: 160 });

var box_1 = new Box({ x: 100, y: 100 });
var box_2 = new Box({ x: 160, y: 80  });
var box_3 = new Box({ x: 140, y: 160 });

var sand_1 = new Sand({ x: 0, y: 0   });
var sand_2 = new Sand({ x: 0, y: 20  });
var sand_3 = new Sand({ x: 20, y: 0  });
var sand_4 = new Sand({ x: 20, y: 20 });

for (var container in WORLD_MAP.containers) {
  WORLD_MAP.map.addChild(WORLD_MAP.containers[container]);
}

for (var landscape in WORLD_MAP.landscape) {
  WORLD_MAP.map.addChild(WORLD_MAP.landscape[landscape]);
}

WORLD_MAP.containers.players.addChild(player_1.model);
WORLD_MAP.containers.players.addChild(player_2.model);
WORLD_MAP.containers.walls.addChild(wall_1.model);
WORLD_MAP.containers.walls.addChild(wall_2.model);
WORLD_MAP.containers.walls.addChild(wall_3.model);
WORLD_MAP.containers.boxes.addChild(box_1.model);
WORLD_MAP.containers.boxes.addChild(box_2.model);
WORLD_MAP.containers.boxes.addChild(box_3.model);
// WORLD_MAP.landscape.sand.addChild(sand_1.model);
// WORLD_MAP.landscape.sand.addChild(sand_2.model);
// WORLD_MAP.landscape.sand.addChild(sand_3.model);
// WORLD_MAP.landscape.sand.addChild(sand_4.model);