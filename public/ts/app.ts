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


var player_1 = new Player(PIXI.Texture.fromImage('../img/eshtu.png'), 400, 240);
var plm_1 = player_1.model;

var wall_1 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 40);
var wall_2 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 60);
var wall_3 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 80);
var wall_4 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 100);
var wall_5 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 120);
var wall_6 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 140);
var wall_7 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 160);
var wall_8 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 100, 160);
var wall_9 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 120, 160);
var wall_10 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 140, 160);
var wall_11 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 160, 160);
var wall_12 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 160);
var wall_13 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 140);
var wall_14 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 120);
var wall_15 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 100);
var wall_16 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 80);
var wall_17 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 80, 20);
var wall_18 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 60);
var wall_19 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 40);
var wall_20 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 20);
var wall_52 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 260, 20);
var wall_21 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 240, 20);
var wall_22 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 320, 20);
var wall_23 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 280, 20);
var wall_24 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 300, 20);
var wall_25 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 340, 20);
var wall_26 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 340, 40);
var wall_27 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 340, 60);
var wall_28 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 340, 80);
var wall_29 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 340, 100);
var wall_30 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 340, 120);
var wall_31 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 340, 140);
var wall_32 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 340, 160);
var wall_33 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 320, 160);
var wall_34 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 300, 160);
var wall_35 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 280, 160);
var wall_36 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 260, 160);
var wall_37 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 40);
var wall_38 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 60);
var wall_39 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 80);
var wall_40 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 100);
var wall_41 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 120);
var wall_42 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 140);
var wall_43 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 160);
var wall_44 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 160);
var wall_45 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 420, 160);
var wall_46 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 440, 160);
var wall_47 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 460, 160);
var wall_51 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 500, 160);
var wall_48 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 400, 20);
var wall_49 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 480, 160);
var wall_50 = new Wall(PIXI.Texture.fromImage('../img/wall.png'), 180, 160);
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
worldMap.containers.walls.addChild(wall_17.model);
worldMap.containers.walls.addChild(wall_18.model);
worldMap.containers.walls.addChild(wall_19.model);
worldMap.containers.walls.addChild(wall_20.model);
worldMap.containers.walls.addChild(wall_21.model);
worldMap.containers.walls.addChild(wall_22.model);
worldMap.containers.walls.addChild(wall_23.model);
worldMap.containers.walls.addChild(wall_24.model);
worldMap.containers.walls.addChild(wall_25.model);
worldMap.containers.walls.addChild(wall_26.model);
worldMap.containers.walls.addChild(wall_27.model);
worldMap.containers.walls.addChild(wall_28.model);
worldMap.containers.walls.addChild(wall_29.model);
worldMap.containers.walls.addChild(wall_30.model);
worldMap.containers.walls.addChild(wall_31.model);
worldMap.containers.walls.addChild(wall_32.model);
worldMap.containers.walls.addChild(wall_33.model);
worldMap.containers.walls.addChild(wall_34.model);
worldMap.containers.walls.addChild(wall_35.model);
worldMap.containers.walls.addChild(wall_36.model);
worldMap.containers.walls.addChild(wall_37.model);
worldMap.containers.walls.addChild(wall_38.model);
worldMap.containers.walls.addChild(wall_39.model);
worldMap.containers.walls.addChild(wall_40.model);
worldMap.containers.walls.addChild(wall_41.model);
worldMap.containers.walls.addChild(wall_42.model);
worldMap.containers.walls.addChild(wall_43.model);
worldMap.containers.walls.addChild(wall_44.model);
worldMap.containers.walls.addChild(wall_45.model);
worldMap.containers.walls.addChild(wall_46.model);
worldMap.containers.walls.addChild(wall_47.model);
worldMap.containers.walls.addChild(wall_48.model);
worldMap.containers.walls.addChild(wall_49.model);
worldMap.containers.walls.addChild(wall_50.model);
worldMap.containers.walls.addChild(wall_51.model);
worldMap.containers.walls.addChild(wall_52.model);

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