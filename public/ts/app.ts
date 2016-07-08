//=== DEPENDING ON ===//

/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/pixi.js/pixi.js.d.ts"/>
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts"/>

//=== IMPORT FILES ===//

/// <reference path="functions.ts"/>
/// <reference path="classes/Game.ts"/>
/// <reference path="classes/WorldMap.ts"/>
/// <reference path="gameplay_classes/Block.ts"/>
/// <reference path="gameplay_classes/Player.ts"/>
/// <reference path="gameplay_classes/Bomb.ts"/>
/// <reference path="gameplay_classes/Wall.ts"/>
/// <reference path="gameplay_classes/Box.ts"/>

//=== CODE ===//

/// <reference path="example_blocks.ts"/>

const GAME = new Game;
const WORLD_MAP = new WorldMap;

var playerTexture = PIXI.Texture.fromImage('../img/eshtu.png');
var player_1 = new Player(playerTexture, 80, 60);

/// <reference path="map.ts"/>

var renderer = PIXI.autoDetectRenderer(GAME.Display.width, GAME.Display.height, { backgroundColor: 0x999999 });
$('#game').append('<div id="game-display"></div>');
$('#game #game-display').append(renderer.view);

requestAnimationFrame(animate);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(WORLD_MAP.map);
}


/// <reference path="hotkeys.ts"/>
/// <reference path="socket.ts"/>




// UI

/// <reference path="ui.ts"/>