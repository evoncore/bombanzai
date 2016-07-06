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

/// <reference path="socket.ts"/>

//=== CODE ===//

// DO NOT TOUCH. Not for dynamic generation; initialized in the code
var exampleWall = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 0, 0);
var exampleBlock = new Block(false);


var game = new Game;
var worldMap = new WorldMap;


var player_1 = new Player(PIXI.Texture.fromImage('../img/eshtu.png'), 180, 140);
var plm_1 = player_1.model;

var wall_1 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 40);
var wall_2 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 300, 60);
var wall_3 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 60);
worldMap.containers.map.addChild(worldMap.containers.players);
worldMap.containers.map.addChild(worldMap.containers.bombs);
worldMap.containers.map.addChild(worldMap.containers.walls);

worldMap.containers.players.addChild(plm_1);
worldMap.containers.walls.addChild(wall_1.model);
worldMap.containers.walls.addChild(wall_2.model);
worldMap.containers.walls.addChild(wall_3.model);

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