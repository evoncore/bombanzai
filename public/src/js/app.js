var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../app.ts"/>
var socket = io('', {
    'reconnectionDelay': 1,
    'reconnectionAttempts': 60
});
var ul = $('#chat ul');
var form = $('#chat form');
var bombx = {
    object: null
};
form.on('submit', function (e) { e.preventDefault(); });
socket
    .on('chat message', function (msg) {
    ul.append('<li>' + msg + '</li>');
})
    .on('connect', function () {
    ul.append('<li class="sys-msg">Соединение установлено</li>');
    ;
    form.on('submit', sendMessage);
    socket.on('player id', function (id) {
        var num = id;
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
    socket.emit('player_1 moving', player_1.model.position);
    socket
        .on('player_1 coords', function (player_coords) {
        player_1.model.position.x = player_coords.x;
        player_1.model.position.y = player_coords.y;
    });
    socket.emit('player_2 moving', player_2.model.position);
    socket
        .on('player_2 coords', function (player_coords) {
        player_2.model.position.x = player_coords.x;
        player_2.model.position.y = player_coords.y;
    });
    socket.emit('player_3 moving', player_3.model.position);
    socket
        .on('player_3 coords', function (player_coords) {
        player_3.model.position.x = player_coords.x;
        player_3.model.position.y = player_coords.y;
    });
    socket
        .on('player_1 face_res', function (face_res) {
        player_1.model.texture = PIXI.Texture.fromImage(face_res);
    })
        .on('player_2 face_res', function (face_res) {
        player_2.model.texture = PIXI.Texture.fromImage(face_res);
    })
        .on('player_3 face_res', function (face_res) {
        player_3.model.texture = PIXI.Texture.fromImage(face_res);
    })
        .on('bomb bang_res', function (bomb_value) {
        for (var z = 0; z < objectContainers.length; z++) {
            objectContainers[z].removeChild(destroyObjects[bomb_value]);
        }
    })
        .on('bomb coords_res', function (bomb_coords_res) {
        bombx.object = new Bomb({ x: bomb_coords_res.x, y: bomb_coords_res.y, waveLevel: 1 });
        WORLD_MAP.containers.bombs.addChild(bombx.object.model);
    })
        .on('bomb coords_remove_res', function (bomb_coords_res) {
        for (var i = 0; i < WORLD_MAP.containers.bombs.children.length; ++i) {
            if (WORLD_MAP.containers.bombs.children[i].position.x == bomb_coords_res.x && WORLD_MAP.containers.bombs.children[i].position.y == bomb_coords_res.y) {
                WORLD_MAP.containers.bombs.removeChild(WORLD_MAP.containers.bombs.children[i]);
            }
        }
    });
})
    .on('disconnect', function () {
    ul.append('<li class="sys-msg">Соединение потеряно</li>');
    ;
    form.on('submit', function (e) { e.preventDefault(); });
})
    .on('reconnect_failed', function () {
    ul.append('<li class="sys-msg">Соединение закрыто</li>');
    ;
});
socket.on('pong', function (data) {
    var data = data;
    if (data && typeof data == 'number') {
        $('#ping span').text('ping: ' + data);
    }
});
function sendMessage() {
    socket.emit('chat message', $('#user-message').val());
    $('#user-message').val('');
    return false;
}
;
function returnValue(value) {
    return {
        v: value
    };
}
function findArrayValue(array, value) {
    if (array.indexOf) {
        return array.indexOf(value);
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value)
            return i;
    }
    return -1;
}
function slicePixels(obj) {
    return Number(obj.length == 5 ? obj.slice(0, 3) : obj.slice(0, 2));
}
var Game = (function () {
    function Game() {
        this.Display = {
            width: 340,
            height: 340,
            scroll: false
        };
    }
    return Game;
}());
var WorldMap = (function () {
    function WorldMap() {
        this.map = new PIXI.Container();
        this.containers = {
            players: new PIXI.Container(),
            bombs: new PIXI.Container(),
            walls: new PIXI.Container(),
            boxes: new PIXI.Container()
        };
        this.landscape = {
            earth: new PIXI.Container(),
            water: new PIXI.Container(),
            jungle: new PIXI.Container(),
            sand: new PIXI.Container()
        };
    }
    return WorldMap;
}());
var Block = (function () {
    function Block(params) {
        this.size = 20;
        this.blocked = false;
        this.destroy = false;
        this.blocked = params.blocked;
        this.destroy = params.destroy;
    }
    return Block;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(params, texture) {
        if (texture === void 0) { texture = PIXI.Texture.fromImage('../img/player_1.png'); }
        _super.call(this, {
            blocked: true,
            destroy: true
        });
        this.alive = true;
        this.coords = {
            x: null,
            y: null
        };
        this.canMove = {
            Up: true,
            Down: true,
            Left: true,
            Right: true
        };
        this.camera = {
            x: -340,
            y: -180,
            move: function (coord, vector) {
                if (vector == 'y') {
                    $('canvas').css({ marginTop: -coord + 'px' });
                }
                else if (vector == 'x') {
                    $('canvas').css({ marginLeft: -coord + 'px' });
                }
            }
        };
        this.texture = texture;
        this.model = new PIXI.Sprite(this.texture);
        this.model._a_name = 'player';
        this.model.control = false;
        this.model.bombsValue = 2;
        this.model.bombsCount = this.model.bombsValue;
        this.model.position.x = params.x;
        this.model.position.y = params.y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.model.size = this.size;
        this.model.blocked = this.blocked;
        this.model.destroy = this.destroy;
        this.speed = this.size;
        this.model.speed = this.speed;
        this.coords.x = params.x;
        this.coords.y = params.y;
        this.model.canMove = this.canMove;
    }
    ;
    return Player;
}(Block));
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb(params) {
        _super.call(this, {
            blocked: true,
            destroy: true
        });
        this.texture = PIXI.Texture.fromImage('../img/bomb.png');
        this.waveLevel = {
            size: null,
            level: 1,
            wave: null
        };
        this.model = new PIXI.Sprite(this.texture);
        this.model._a_name = 'bomb';
        this.model.position.x = params.x;
        this.model.position.y = params.y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.model.size = this.size;
        this.model.blocked = this.blocked;
        this.model.destroy = this.destroy;
        this.waveLevel.size = this.size;
        this.waveLevel.level = params.waveLevel;
        this.waveLevel.wave = this.waveLevel.size * this.waveLevel.level;
    }
    ;
    return Bomb;
}(Block));
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(params) {
        _super.call(this, {
            blocked: true,
            destroy: false
        });
        this.texture = PIXI.Texture.fromImage('../img/wall.png');
        this.model = new PIXI.Sprite(this.texture);
        this.model._a_name = 'wall';
        this.model.position.x = params.x;
        this.model.position.y = params.y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.model.size = this.size;
        this.model.blocked = this.blocked;
        this.model.destroy = this.destroy;
    }
    return Wall;
}(Block));
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(params) {
        _super.call(this, {
            blocked: true,
            destroy: true
        });
        this.texture = PIXI.Texture.fromImage('../img/box.png');
        this.model = new PIXI.Sprite(this.texture);
        this.model._a_name = 'box';
        this.model.position.x = params.x;
        this.model.position.y = params.y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.model.size = this.size;
        this.model.blocked = this.blocked;
        this.model.destroy = this.destroy;
    }
    return Box;
}(Block));
var Sand = (function (_super) {
    __extends(Sand, _super);
    function Sand(params) {
        _super.call(this, {
            blocked: false,
            destroy: false
        });
        this.texture = PIXI.Texture.fromImage('../img/sand.svg');
        this.model = new PIXI.Sprite(this.texture);
        this.model._a_name = 'sand';
        this.model.position.x = params.x;
        this.model.position.y = params.y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.model.size = this.size;
        this.model.blocked = this.blocked;
        this.model.destroy = this.destroy;
    }
    return Sand;
}(Block));
// DO NOT TOUCH. Not for dynamic generation; initialized in the code -->
var exampleBlock = new Block({
    blocked: false,
    destroy: false
});
var examplePlayer = new Sand({ x: 0, y: 0 });
var exampleWall = new Wall({ x: 0, y: 0 });
var exampleBox = new Box({ x: 0, y: 0 });
var exampleBomb = new Bomb({ x: 0, y: 0, waveLevel: 1 });
var exampleSand = new Sand({ x: 0, y: 0 });
// <-- end // 
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
var GAME = new Game;
var WORLD_MAP = new WorldMap;
var player_1 = new Player({ x: 0, y: 0 });
var player_2 = new Player({ x: 320, y: 320 }, PIXI.Texture.fromImage('../img/player_2.png'));
var player_3 = new Player({ x: 0, y: 320 }, PIXI.Texture.fromImage('../img/player_3.png'));
socket.on('player id', function (id) {
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
createMap(function () {
    for (var key in WORLD_MAP.containers) {
        var push = false;
        for (var key2 in WORLD_MAP.containers[key].children) {
            if (WORLD_MAP.containers[key].children[key2].destroy) {
                push = true;
            }
        }
        for (var key3 in WORLD_MAP.containers[key].children) {
            if (push) {
                destroyObjects.push(WORLD_MAP.containers[key].children[key3]);
            }
        }
    }
    // Add Players
    for (var player_ in WORLD_MAP.containers.players.children) {
        players.push(WORLD_MAP.containers.players.children[player_]);
    }
    for (var key4 in WORLD_MAP.containers) {
        objectContainers.push(WORLD_MAP.containers[key4]);
    }
});
/// <reference path="hotkeys.ts"/>
// UI
/// <reference path="ui.ts"/> 
var Controls = (function () {
    function Controls() {
        this.Keyboard = {
            key: {
                arrowUp: {
                    val: 38,
                    action: function () {
                        keyArrowUp().pressed();
                    }
                },
                arrowDown: {
                    val: 40,
                    action: function () {
                        keyArrowDown().pressed();
                    }
                },
                arrowLeft: {
                    val: 37,
                    action: function () {
                        keyArrowLeft().pressed();
                    }
                },
                arrowRight: {
                    val: 39,
                    action: function () {
                        keyArrowRight().pressed();
                    }
                },
                Spacebar: {
                    val: 32,
                    action: function () {
                        keySpacebar().pressed();
                    }
                }
            }
        };
        this.Joystick = {};
    }
    return Controls;
}());
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/socket.ts"/>
function keyArrowDown() {
    return {
        pressed: function () {
            var objects = [];
            var blocked_objects = [];
            var players = [];
            function createArrays(callback) {
                // Add Objects
                for (var key in WORLD_MAP.containers) {
                    var push = false;
                    for (var key2 in WORLD_MAP.containers[key].children) {
                        if (WORLD_MAP.containers[key].children[key2]) {
                            push = true;
                        }
                    }
                    for (var key3 in WORLD_MAP.containers[key].children) {
                        if (push && WORLD_MAP.containers[key].children[key3] !== 0) {
                            objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
                }
                // Add Players
                for (var player_ in WORLD_MAP.containers.players.children) {
                    players.push(WORLD_MAP.containers.players.children[player_]);
                }
                // Add Blocked Objects without player
                for (var key in WORLD_MAP.containers) {
                    var push = false;
                    for (var key2 in WORLD_MAP.containers[key].children) {
                        if (WORLD_MAP.containers[key].children[key2].blocked) {
                            push = true;
                        }
                    }
                    for (var key3 in WORLD_MAP.containers[key].children) {
                        if (push && WORLD_MAP.containers[key].children[key3]._a_name != 'player') {
                            blocked_objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
                }
                callback();
            }
            createArrays(function () {
                for (var o = 0; o < players.length; o++) {
                    if (players[o].control) {
                        players[o].canMove.Down = true;
                        for (var j = 0; j < blocked_objects.length; j++) {
                            if (blocked_objects[j].blocked) {
                                for (var i = 0; i < objects.length; i++) {
                                    if (!(players[o].position.x != objects[i].position.x ||
                                        players[o].position.y != (objects[i].position.y - blocked_objects[j].size))) {
                                        players[o].canMove.Down = false;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < objects[j].children.length; i++) {
                                    if (!(players[o].position.x != objects[i].position.x ||
                                        players[o].position.y != (objects[i].position.y - blocked_objects[j].size))) {
                                        players[o].canMove.Down = true;
                                    }
                                }
                            }
                        } // End main For
                        if (players[o].control && players[o].canMove.Down && players[o].position.y < (GAME.Display.height - players[o].size)) {
                            players[o].position.y += 1 * players[o].speed;
                            if (GAME.Display.scroll) {
                                players[o].camera.y += 1 * players[o].speed;
                                players[o].camera.move(players[o].camera.y, 'y');
                            }
                        }
                        socket.emit('player_' + (o + 1) + ' face', '../img/player_' + (o + 1) + '_bottom.png');
                        socket.emit('player_' + (o + 1) + ' moving', players[o].position);
                    } // End if -> players.controls
                } // End Players For
            }); // End createArrays Function
        } // End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/socket.ts"/>
function keyArrowUp() {
    return {
        pressed: function () {
            var objects = [];
            var blocked_objects = [];
            var players = [];
            function createArrays(callback) {
                // Add Objects
                for (var key in WORLD_MAP.containers) {
                    var push = false;
                    for (var key2 in WORLD_MAP.containers[key].children) {
                        if (WORLD_MAP.containers[key].children[key2]) {
                            push = true;
                        }
                    }
                    for (var key3 in WORLD_MAP.containers[key].children) {
                        if (push && WORLD_MAP.containers[key].children[key3] !== 0) {
                            objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
                }
                // Add Players
                for (var player_ in WORLD_MAP.containers.players.children) {
                    players.push(WORLD_MAP.containers.players.children[player_]);
                }
                // Add Blocked Objects without player
                for (var key in WORLD_MAP.containers) {
                    var push = false;
                    for (var key2 in WORLD_MAP.containers[key].children) {
                        if (WORLD_MAP.containers[key].children[key2].blocked) {
                            push = true;
                        }
                    }
                    for (var key3 in WORLD_MAP.containers[key].children) {
                        if (push && WORLD_MAP.containers[key].children[key3]._a_name != 'player') {
                            blocked_objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
                }
                callback();
            }
            createArrays(function () {
                for (var o = 0; o < players.length; o++) {
                    if (players[o].control) {
                        players[o].canMove.Up = true;
                        for (var j = 0; j < blocked_objects.length; j++) {
                            if (blocked_objects[j].blocked) {
                                for (var i = 0; i < objects.length; i++) {
                                    if (!(players[o].position.x != objects[i].position.x ||
                                        players[o].position.y != (objects[i].position.y + blocked_objects[j].size))) {
                                        players[o].canMove.Up = false;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < objects[j].children.length; i++) {
                                    if (!(players[o].position.x != objects[i].position.x ||
                                        players[o].position.y != (objects[i].position.y + blocked_objects[j].size))) {
                                        players[o].canMove.Up = true;
                                    }
                                }
                            }
                        } // End main For
                        if (players[o].control && players[o].canMove.Up && players[o].position.y > 0) {
                            players[o].position.y -= 1 * players[o].speed;
                            if (GAME.Display.scroll) {
                                players[o].camera.y -= 1 * players[o].speed;
                                players[o].camera.move(players[o].camera.y, 'y');
                            }
                        }
                        socket.emit('player_' + (o + 1) + ' face', '../img/player_' + (o + 1) + '_top.png');
                        socket.emit('player_' + (o + 1) + ' moving', players[o].position);
                    } // End if -> players.controls
                } // End Players For 
            }); // End createArrays Function
        } // End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/socket.ts"/>
function keyArrowRight() {
    return {
        pressed: function () {
            var objects = [];
            var blocked_objects = [];
            var players = [];
            function createArrays(callback) {
                // Add Objects
                for (var key in WORLD_MAP.containers) {
                    var push = false;
                    for (var key2 in WORLD_MAP.containers[key].children) {
                        if (WORLD_MAP.containers[key].children[key2]) {
                            push = true;
                        }
                    }
                    for (var key3 in WORLD_MAP.containers[key].children) {
                        if (push && WORLD_MAP.containers[key].children[key3] !== 0) {
                            objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
                }
                // Add Players
                for (var player_ in WORLD_MAP.containers.players.children) {
                    players.push(WORLD_MAP.containers.players.children[player_]);
                }
                // Add Blocked Objects without player
                for (var key in WORLD_MAP.containers) {
                    var push = false;
                    for (var key2 in WORLD_MAP.containers[key].children) {
                        if (WORLD_MAP.containers[key].children[key2].blocked) {
                            push = true;
                        }
                    }
                    for (var key3 in WORLD_MAP.containers[key].children) {
                        if (push && WORLD_MAP.containers[key].children[key3]._a_name != 'player') {
                            blocked_objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
                }
                callback();
            }
            createArrays(function () {
                for (var o = 0; o < players.length; o++) {
                    if (players[o].control) {
                        players[o].canMove.Right = true;
                        for (var j = 0; j < blocked_objects.length; j++) {
                            if (blocked_objects[j].blocked) {
                                for (var i = 0; i < objects.length; i++) {
                                    if (!(players[o].position.x != objects[i].position.x - blocked_objects[j].size ||
                                        players[o].position.y != objects[i].position.y)) {
                                        players[o].canMove.Right = false;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < objects[j].children.length; i++) {
                                    if (!(players[o].position.x != (objects[i].position.x - blocked_objects[j].size) ||
                                        players[o].position.y != objects[i].position.y)) {
                                        players[o].canMove.Right = true;
                                    }
                                }
                            }
                        } // End main For
                        if (players[o].control && players[o].canMove.Right && players[o].position.x < (GAME.Display.width - players[o].size)) {
                            players[o].position.x += 1 * players[o].speed;
                            if (GAME.Display.scroll) {
                                players[o].camera.x += 1 * players[o].speed;
                                players[o].camera.move(players[o].camera.x, 'x');
                            }
                        }
                        socket.emit('player_' + (o + 1) + ' face', '../img/player_' + (o + 1) + '_right.png');
                        socket.emit('player_' + (o + 1) + ' moving', players[o].position);
                    } // End if -> players.controls
                } // End Players For 
            }); // End createArrays Function
        } // End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/socket.ts"/>
function keyArrowLeft() {
    return {
        pressed: function () {
            var objects = [];
            var blocked_objects = [];
            var players = [];
            function createArrays(callback) {
                // Add Objects
                for (var key in WORLD_MAP.containers) {
                    var push = false;
                    for (var key2 in WORLD_MAP.containers[key].children) {
                        if (WORLD_MAP.containers[key].children[key2]) {
                            push = true;
                        }
                    }
                    for (var key3 in WORLD_MAP.containers[key].children) {
                        if (push && WORLD_MAP.containers[key].children[key3] !== 0) {
                            objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
                }
                // Add Players
                for (var player_ in WORLD_MAP.containers.players.children) {
                    players.push(WORLD_MAP.containers.players.children[player_]);
                }
                // Add Blocked Objects without player
                for (var key in WORLD_MAP.containers) {
                    var push = false;
                    for (var key2 in WORLD_MAP.containers[key].children) {
                        if (WORLD_MAP.containers[key].children[key2].blocked) {
                            push = true;
                        }
                    }
                    for (var key3 in WORLD_MAP.containers[key].children) {
                        if (push && WORLD_MAP.containers[key].children[key3]._a_name != 'player') {
                            blocked_objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
                }
                callback();
            }
            createArrays(function () {
                for (var o = 0; o < players.length; o++) {
                    if (players[o].control) {
                        players[o].canMove.Left = true;
                        for (var j = 0; j < blocked_objects.length; j++) {
                            if (blocked_objects[j].blocked) {
                                for (var i = 0; i < objects.length; i++) {
                                    if (!(players[o].position.x != (objects[i].position.x + blocked_objects[j].size) ||
                                        players[o].position.y != objects[i].position.y)) {
                                        players[o].canMove.Left = false;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < objects[j].children.length; i++) {
                                    if (!(players[o].position.x != (objects[i].position.x + blocked_objects[j].size) ||
                                        players[o].position.y != objects[i].position.y)) {
                                        players[o].canMove.Left = true;
                                    }
                                }
                            }
                        } // End main For
                        if (players[o].control && players[o].canMove.Left && players[o].position.x > 0) {
                            players[o].position.x -= 1 * players[o].speed;
                            if (GAME.Display.scroll) {
                                players[o].camera.x -= 1 * players[o].speed;
                                players[o].camera.move(players[o].camera.x, 'x');
                            }
                        }
                        socket.emit('player_' + (o + 1) + ' face', '../img/player_' + (o + 1) + '_left.png');
                        socket.emit('player_' + (o + 1) + ' moving', players[o].position);
                    } // End if -> players.controls
                } // End Players For
            }); // End createArrays Function
        } // End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
function keySpacebar() {
    function showBombsValue(value, staticValue) {
        $('#bar span.bombs').text('bombs: ' + value + ' / ' + staticValue);
    }
    return {
        pressed: function () {
            var _loop_1 = function() {
                if (players[o].control) {
                    currentPlayer = players[o];
                    if (currentPlayer.bombsCount > 0) {
                        showBombsValue(currentPlayer.bombsCount, staticBombsCount);
                        if (WORLD_MAP.containers.bombs.children.length === 0) {
                            socket.emit('bomb coords', currentPlayer.position);
                            bomb = new Bomb({ x: currentPlayer.position.x, y: currentPlayer.position.y, waveLevel: 1 });
                            WORLD_MAP.containers.bombs.addChild(bomb.model);
                            if (bomb) {
                                var _firstBomb_1 = bomb;
                                setTimeout(function () {
                                    if (destroyObjects.length !== 0) {
                                        for (var i = 0; i < destroyObjects.length; i++) {
                                            if (_firstBomb_1.model.position.y === (destroyObjects[i].position.y - _firstBomb_1.waveLevel.wave) &&
                                                _firstBomb_1.model.position.x === destroyObjects[i].position.x ||
                                                _firstBomb_1.model.position.y === (destroyObjects[i].position.y + _firstBomb_1.waveLevel.wave) &&
                                                    _firstBomb_1.model.position.x === destroyObjects[i].position.x ||
                                                _firstBomb_1.model.position.x === (destroyObjects[i].position.x - _firstBomb_1.waveLevel.wave) &&
                                                    _firstBomb_1.model.position.y === destroyObjects[i].position.y ||
                                                _firstBomb_1.model.position.x === (destroyObjects[i].position.x + _firstBomb_1.waveLevel.wave) &&
                                                    _firstBomb_1.model.position.y === destroyObjects[i].position.y ||
                                                _firstBomb_1.model.position.x === destroyObjects[i].position.x &&
                                                    _firstBomb_1.model.position.y === destroyObjects[i].position.y) {
                                                // ..done ->
                                                socket.emit('bomb coords_remove', _firstBomb_1.model.position);
                                                for (var z = 0; z < objectContainers.length; z++) {
                                                    // findArrayValue - global function from ./functions.ts
                                                    socket.emit('bomb bang', findArrayValue(destroyObjects, destroyObjects[i]));
                                                }
                                            }
                                            else {
                                                socket.emit('bomb coords_remove', _firstBomb_1.model.position);
                                            }
                                        }
                                    }
                                    else {
                                        socket.emit('bomb coords_remove', _firstBomb_1.model.position);
                                    }
                                }, 1000);
                            }
                        }
                        else if (currentPlayer.position.x !== bomb.model.position.x || currentPlayer.position.y !== bomb.model.position.y) {
                            bomb = new Bomb({ x: currentPlayer.position.x, y: currentPlayer.position.y, waveLevel: 1 });
                            WORLD_MAP.containers.bombs.addChild(bomb.model);
                            if (bomb) {
                                var _otherBomb_1 = bomb;
                                setTimeout(function () {
                                    if (destroyObjects.length !== 0) {
                                        for (var i = 0; i < destroyObjects.length; i++) {
                                            if (_otherBomb_1.model.position.y === (destroyObjects[i].position.y - _otherBomb_1.waveLevel.wave) &&
                                                _otherBomb_1.model.position.x === destroyObjects[i].position.x ||
                                                _otherBomb_1.model.position.y === (destroyObjects[i].position.y + _otherBomb_1.waveLevel.wave) &&
                                                    _otherBomb_1.model.position.x === destroyObjects[i].position.x ||
                                                _otherBomb_1.model.position.x === (destroyObjects[i].position.x - _otherBomb_1.waveLevel.wave) &&
                                                    _otherBomb_1.model.position.y === destroyObjects[i].position.y ||
                                                _otherBomb_1.model.position.x === (destroyObjects[i].position.x + _otherBomb_1.waveLevel.wave) &&
                                                    _otherBomb_1.model.position.y === destroyObjects[i].position.y ||
                                                _otherBomb_1.model.position.x === destroyObjects[i].position.x &&
                                                    _otherBomb_1.model.position.y === destroyObjects[i].position.y) {
                                                // ..done ->
                                                WORLD_MAP.containers.bombs.removeChild(_otherBomb_1.model);
                                                for (var z = 0; z < objectContainers.length; z++) {
                                                    // findArrayValue - global function from ./functions.ts
                                                    socket.emit('bomb bang', findArrayValue(destroyObjects, destroyObjects[i]));
                                                }
                                            }
                                            else {
                                                WORLD_MAP.containers.bombs.removeChild(_otherBomb_1.model);
                                            }
                                        }
                                    }
                                    else {
                                        WORLD_MAP.containers.bombs.removeChild(_otherBomb_1.model);
                                    }
                                }, 1000);
                            }
                        }
                    }
                } // End Main If
            };
            var currentPlayer;
            for (var o = 0; o < players.length; o++) {
                _loop_1();
            } // End Main For
        }
    };
}
/// <reference path="app.ts"/>
/// <reference path="classes/Controls.ts"/>
/// <reference path="hotkeys_methods/ArrowDown.ts"/>
/// <reference path="hotkeys_methods/ArrowUp.ts"/>
/// <reference path="hotkeys_methods/ArrowRight.ts"/>
/// <reference path="hotkeys_methods/ArrowLeft.ts"/>
/// <reference path="hotkeys_methods/Spacebar.ts"/>
var CONTROLS = new Controls;
var two_keys = false;
var bomb;
player_1.camera.x += player_1.model.position.x;
player_1.camera.y += player_1.model.position.y;
$('canvas').css({
    marginLeft: -player_1.camera.x + 'px',
    marginTop: -player_1.camera.y + 'px'
});
$(document).on('keydown', function (e) {
    // Disable all default key-events
    // if (e.stopPropagation) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }
    switch (e.which) {
        case CONTROLS.Keyboard.key.arrowDown.val:
            ////
            if (!two_keys) {
                CONTROLS.Keyboard.key.arrowDown.action();
            }
            ////
            break;
        case CONTROLS.Keyboard.key.arrowUp.val:
            ////
            if (!two_keys) {
                CONTROLS.Keyboard.key.arrowUp.action();
            }
            ////
            break;
        case CONTROLS.Keyboard.key.arrowRight.val:
            ////
            if (!two_keys) {
                CONTROLS.Keyboard.key.arrowRight.action();
            }
            ////
            break;
        case CONTROLS.Keyboard.key.arrowLeft.val:
            ////
            if (!two_keys) {
                CONTROLS.Keyboard.key.arrowLeft.action();
            }
            ////
            break;
        case CONTROLS.Keyboard.key.Spacebar.val:
            ////
            CONTROLS.Keyboard.key.Spacebar.action();
            ////
            break;
    }
});
// Top Left
// twoKeysDown(
//   function() {
//     CONTROLS.Keyboard.key.arrowUp.action();
//     CONTROLS.Keyboard.key.arrowLeft.action();
//   },
//   CONTROLS.Keyboard.key.arrowUp.val,
//   CONTROLS.Keyboard.key.arrowLeft.val
// );
// // Top Right
// twoKeysDown(
//   function() {
//     CONTROLS.Keyboard.key.arrowUp.action();
//     CONTROLS.Keyboard.key.arrowRight.action();
//   },
//   CONTROLS.Keyboard.key.arrowUp.val,
//   CONTROLS.Keyboard.key.arrowRight.val
// );
// // Bottom Left
// twoKeysDown(
//   function() {
//     CONTROLS.Keyboard.key.arrowDown.action();
//     CONTROLS.Keyboard.key.arrowLeft.action();
//   },
//   CONTROLS.Keyboard.key.arrowDown.val,
//   CONTROLS.Keyboard.key.arrowLeft.val
// );
// // Bottom Right
// twoKeysDown(
//   function() {
//     CONTROLS.Keyboard.key.arrowDown.action();
//     CONTROLS.Keyboard.key.arrowRight.action();
//   },
//   CONTROLS.Keyboard.key.arrowRight.val,
//   CONTROLS.Keyboard.key.arrowDown.val
// );
// function twoKeysDown(func, key1, key2) {
//   var codes = [].slice.call(arguments, 1);
//   var pressed = {};
//   $(document).on('keydown', function(e) {
//     pressed[e.keyCode] = true;
//     two_keys = true;
//     for (var i = 0; i < codes.length; i++) {
//       if (!pressed[codes[i]]) {
//         return;
//       }
//     }
//     // only one click
//     // pressed = {};
//     func();
//   });
//   $(document).on('keyup', function(e) {
//     two_keys = false;
//     delete pressed[e.keyCode];
//   });
// } 
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
/// <reference path="app.ts"/>
// One Page App
var ui;
(function (ui) {
    $(window).on('gamepadconnection', function (e) {
        console.log('gamepad-connected!');
    });
    $('aside nav li.game').addClass('active');
    location.href = '#/game';
    $('section').stop().fadeOut(200);
    $('#game').stop().fadeIn(200);
    $('aside nav a').on('click', function (e) {
        e.preventDefault();
        if (!(this.classList.contains('active')) && !(this.classList.contains('exit'))) {
            var urlPattern = /[a-z]+$/g;
            var url = this.href.match(urlPattern);
            if (url == null)
                url = 'info';
            location.href = '#/' + url;
            $(this).parent()
                .addClass('active')
                .siblings()
                .removeClass('active');
            $('section').stop().fadeOut(200);
            $('#' + url).stop().fadeIn(200);
            if (url != 'game') {
                $('#bar').stop().animate({ bottom: -$('#bar').innerHeight() }, 300);
                $('#chat').stop().animate({
                    height: $('body').innerHeight()
                }, 300);
                $('#info').css({ overflowY: 'auto' });
            }
            else {
                $('#chat').stop().animate({
                    height: $('body').innerHeight() - $('#bar').innerHeight() + 'px'
                }, 300);
                $('#bar').stop().animate({ bottom: 0 }, 300);
            }
        }
    });
    // Exit
    $('aside nav li.exit a').on('click', function (e) { e.preventDefault(); });
    // Grid
    $('#game #game-display').append('<div id="grid"></div>');
    $('#game #game-display #grid').css({
        width: GAME.Display.width + 'px',
        top: 0,
        left: $('canvas').css('left')
    });
    for (var i = 0; i < 0; i++) {
        $('#game #game-display  #grid').append('<i class="map-tile"></i>');
    }
    // Bar
    var staticBombsCount = player_1.model.bombsCount;
    $('#game #bar .row').prepend('<div class="col-md-9"></div>');
    $('#game #bar .col-md-9').append('<span class="hp">hp: <b>100 / 100</b></span>');
    $('#game #bar .col-md-9').append('<span class="bombs">bombs: <b>' + staticBombsCount + ' / ' + staticBombsCount + '</b></span>');
    // Asides
    $('body').css({ height: $(window).innerHeight() });
    $('body #main-row > .col-md-1:first-child').css({ height: $('body').innerHeight() });
    // Chat
    $('#chat').css({
        height: $('body').innerHeight() - $('#bar').innerHeight() + 'px'
    });
    // Errors
    if ($(window).innerWidth() <= 1199) {
        $('body').css({ backgroundColor: '#fff' });
        $('body > *').css({ display: 'none' });
        $('body').append('<div id="error9001"><img src="../img/errors/9001.gif" alt=":(" />Ваше устройство временно не поддерживается</div>');
    }
    else {
        $('body #error9001').remove();
        $('body').css({ backgroundColor: '#222' });
        $('body > *').css({ display: 'block' });
    }
    $(window).on('resize', function () {
        if ($(window).innerWidth() <= 1199) {
            $('body').css({ backgroundColor: '#fff' });
            $('body > *').css({ display: 'none' });
            $('body').append('<div id="error9001"><img src="../img/errors/9001.gif" alt=":(" />Ваше устройство временно не поддерживается</div>');
        }
        else {
            $('body #error9001').remove();
            $('body').css({ backgroundColor: '#222' });
            $('body > *').css({ display: 'block' });
        }
        $('body').css({ height: $(window).innerHeight() });
        $('body #main-row > .col-md-1:first-child').css({ height: $('body').innerHeight() });
    });
    $(document).ready(function () {
        $('body').addClass('show-body');
    });
})(ui || (ui = {}));
