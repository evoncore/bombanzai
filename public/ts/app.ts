//=== DEPENDING ON ===//

/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/pixi.js/pixi.js.d.ts"/>
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts"/>

//=== IMPORT FILES ===//

/// <reference path="socket/socket.ts"/>
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
var player_2 = new Player({ x: 320, y: 320 }, PIXI.Texture.fromImage('../img/player_2.png'));
var player_3 = new Player({ x: 0, y: 320 }, PIXI.Texture.fromImage('../img/player_3.png'));

socket.on('player id', function(id) {
  var num = id;

  if (id.length >= 4) {
    id = 0;
  }

  if (id > 3) {
    id = 0;
  }

  if (id == 1) {
    player_1.model.control = true;
  }

  if (id == 2) {
    player_2.model.control = true;
  }

  if (id == 3) {
    player_3.model.control = true;
  }
});

/// <reference path="map.ts"/>


var renderer = PIXI.autoDetectRenderer(GAME.Display.width, GAME.Display.height, { backgroundColor: 0x999999 });
$('#game').append('<div id="game-display"></div>');
$('#game #game-display').append(renderer.view);

requestAnimationFrame(animate);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(WORLD_MAP.map);
}

var destroyObjects = [];
var objectContainers = [];
var players = [];
var staticBombsCount = player_1.model.bombsCount;

// function checkPlayer() {
//   for (var o = 0; o < players.length; o++) {
//     if (WORLD_MAP.containers.players.children.length === 1) {
//       players[o].alive = false;
//       console.log(players[o]);
//       console.log(players[o].alive);
//     }
//   }
// }

// function playerPlayerAlive() {
//   for (var o = 0; o < players.length; o++) {
//     if (!players[o].alive) {
//       setTimeout(function() {
//         alert('game over!');
//         location.reload();
//       }, 200);
//     }
//   }
// }

// Add Destroy Objects

createMap(function() {
  for (let key in WORLD_MAP.containers) {
  let push = false;

  for (let key2 in WORLD_MAP.containers[key].children) {
    if (WORLD_MAP.containers[key].children[key2].destroy) {
      push = true;
    }
  }

    for (let key3 in WORLD_MAP.containers[key].children) {
      if (push) {
        destroyObjects.push(WORLD_MAP.containers[key].children[key3]);
      }
    }
  }

  // Add Players
  for (let player_ in WORLD_MAP.containers.players.children) {
    players.push(WORLD_MAP.containers.players.children[player_]);
  }

  for (let key4 in WORLD_MAP.containers) {
    objectContainers.push(WORLD_MAP.containers[key4]);
  }
})



/// <reference path="hotkeys.ts"/>




// UI

/// <reference path="ui.ts"/>