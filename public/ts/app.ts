//=== DEPENDING ON ===//

/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/pixi.js/pixi.js.d.ts"/>

//=== IMPORT FILES ===//

/// <reference path="functions.ts"/>
/// <reference path="classes/Game.ts"/>
/// <reference path="classes/WorldMap.ts"/>
/// <reference path="gameplay_classes/Block.ts"/>
/// <reference path="gameplay_classes/Player.ts"/>
/// <reference path="gameplay_classes/Bomb.ts"/>
/// <reference path="gameplay_classes/Wall.ts"/>

//=== CODE ===//

var game = new Game;
var worldMap = new WorldMap;

// DO NOT TOUCH. Not for dynamic generation; initialized in the code
var exampleWall = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 0, 0);

var player_1 = new Player(PIXI.Texture.fromImage('../img/eshtu.png'), 40, 60);
var plm_1 = player_1.model;

var wall_1 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 40);
var wall_7 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 60);
var wall_8 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 80);
var wall_9 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 100);
var wall_10 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 60, 40);
var wall_11 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 40, 40);
var wall_12 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 20, 40);
var wall_13 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 0, 40);
var wall_14 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 0, 60);
var wall_15 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 0, 80);
var wall_16 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 0, 100);
var wall_2 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 300, 60);
var wall_3 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 60);
var wall_4 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 60, 240);
var wall_5 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 300);
var wall_6 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 300, 600);

worldMap.containers.map.addChild(worldMap.containers.players);
worldMap.containers.map.addChild(worldMap.containers.bombs);
worldMap.containers.map.addChild(worldMap.containers.walls);

worldMap.containers.players.addChild(plm_1);
worldMap.containers.walls.addChild(wall_1.model);
worldMap.containers.walls.addChild(wall_2.model);
worldMap.containers.walls.addChild(wall_3.model);
worldMap.containers.walls.addChild(wall_4.model);
worldMap.containers.walls.addChild(wall_5.model);
worldMap.containers.walls.addChild(wall_6.model);
worldMap.containers.walls.addChild(wall_7.model);
worldMap.containers.walls.addChild(wall_8.model);
worldMap.containers.walls.addChild(wall_9.model);
worldMap.containers.walls.addChild(wall_10.model);
worldMap.containers.walls.addChild(wall_11.model);
worldMap.containers.walls.addChild(wall_12.model);
worldMap.containers.walls.addChild(wall_13.model);
worldMap.containers.walls.addChild(wall_14.model);
worldMap.containers.walls.addChild(wall_15.model);
worldMap.containers.walls.addChild(wall_16.model);

var renderer = PIXI.autoDetectRenderer(game.Display.width, game.Display.height, { backgroundColor: 0x999999 });
$('#game').append('<div id="game-display"></div>');
$('#game #game-display').append(renderer.view);

requestAnimationFrame(animate);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(worldMap.containers.map);
}

plm_1.canMove = new Object;

/// <reference path="hotkeys.ts"/>








// UI

/// <reference path="ui.ts"/>