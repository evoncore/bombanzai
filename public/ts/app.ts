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

/// <reference path="gameplay_classes/landscape/Sand.ts"/>

//=== CODE ===//

/// <reference path="example_blocks.ts"/>

const GAME = new Game;
const WORLD_MAP = new WorldMap;

var player_1 = new Player({ x: 0, y: 0 });
var player_2 = new Player({ x: 240, y: 240 }, PIXI.Texture.fromImage('../img/player_2.png'));

/// <reference path="map.ts"/>

var renderer = PIXI.autoDetectRenderer(GAME.Display.width, GAME.Display.height, { backgroundColor: 0x999999 });
$('#game').append('<div id="game-display"></div>');
$('#game #game-display').append(renderer.view);

requestAnimationFrame(animate);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(WORLD_MAP.map);
}


/// <reference path="socket/socket.ts"/>
/// <reference path="hotkeys.ts"/>




// UI

/// <reference path="ui.ts"/>