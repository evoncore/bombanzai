/// <reference path="app.ts"/>

var wall_1 = new Wall(wallTexture, 80, 40);
var wall_2 = new Wall(wallTexture, 160, 60);
var wall_3 = new Wall(wallTexture, 100, 160);

var box_1 = new Box(boxTexture, 100, 100);
var box_2 = new Box(boxTexture, 160, 80);
var box_3 = new Box(boxTexture, 140, 160);

WORLD_MAP.map.addChild(WORLD_MAP.containers.players);
WORLD_MAP.map.addChild(WORLD_MAP.containers.bombs);
WORLD_MAP.map.addChild(WORLD_MAP.containers.walls);
WORLD_MAP.map.addChild(WORLD_MAP.containers.boxes);

WORLD_MAP.containers.players.addChild(player_1.model);
WORLD_MAP.containers.walls.addChild(wall_1.model);
WORLD_MAP.containers.walls.addChild(wall_2.model);
WORLD_MAP.containers.walls.addChild(wall_3.model);
WORLD_MAP.containers.boxes.addChild(box_1.model);
WORLD_MAP.containers.boxes.addChild(box_2.model);
WORLD_MAP.containers.boxes.addChild(box_3.model);