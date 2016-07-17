var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var socket = io('', {
    reconnection: true,
    'reconnectionDelay': 1,
    'reconnectionAttempts': 60
});
var ul = $('#chat ul');
var form = $('#chat form');
var connectedList = $('#lobby .connected ul');
var prevSlot;
var client = { id: null, name: null };
// Game UI
function gameContinue() {
    if ($('#game').hasClass('paused')) {
        $('#game .shadow').remove();
        $('#game').removeClass('paused');
    }
}
function gamePaused() {
    if ($('#game').hasClass('paused') && $('#game').children('.shadow').length == 0) {
        $('#game').append('<div class="shadow"></div>');
        $('#game .shadow').append('<p class="message">Game is Paused</p>');
    }
}
/// <reference path="../app.ts"/>
/// <reference path="../game_ui.ts"/>
/// <reference path="socket.ts"/>
form.on('submit', function (e) { e.preventDefault(); });
socket
    .on('connect', function () {
    // players coords
    for (var o = 0; o < players.length; o++) {
        socket.emit('player_' + (o + 1) + ' moving', players[o].position);
        (function () {
            var _o_ = o;
            socket.on('player_' + (o + 1) + ' coords', function (player_coords) {
                players[_o_].position.x = player_coords.x;
                players[_o_].position.y = player_coords.y;
            });
            socket.on('player_' + (o + 1) + ' face_res', function (face_res) {
                players[_o_].texture = PIXI.Texture.fromImage(face_res);
            });
        })();
    }
    socket
        .on('bomb bang_res', function (bomb_value) {
        for (var z = 0; z < objectContainers.length; z++) {
            objectContainers[z].removeChild(destroyObjects[bomb_value]);
        }
    })
        .on('bomb coords_res', function (bomb_coords_res) {
        var bomb = new Bomb({ x: bomb_coords_res.x, y: bomb_coords_res.y, waveLevel: 1 }, PIXI.Texture.fromImage(bomb_coords_res.bombImg));
        WORLD_MAP.containers.bombs.addChild(bomb.model);
    })
        .on('bomb coords_remove_res', function (bomb_remove_coords_res) {
        for (var i = 0; i < WORLD_MAP.containers.bombs.children.length; i++) {
            if (WORLD_MAP.containers.bombs.children[i].position.x == bomb_remove_coords_res.x &&
                WORLD_MAP.containers.bombs.children[i].position.y == bomb_remove_coords_res.y) {
                WORLD_MAP.containers.bombs.removeChild(WORLD_MAP.containers.bombs.children[i]);
            }
        }
    })
        .on('pause_res', function (paused_res) {
        if (paused_res == 'paused') {
            $('#game').addClass(paused_res);
            GAME.status = paused_res;
            gamePaused();
        }
        else if (paused_res == 'running') {
            GAME.status = paused_res;
            gameContinue();
        }
    });
});
// show ping
socket.on('pong', function (data) {
    var data = data;
    if (data && typeof data == 'number') {
        $('#ping span').text('ping: ' + data);
    }
});
/// <reference path="../app.ts"/>
/// <reference path="../game_ui.ts"/>
/// <reference path="socket.ts"/>
// Lobby
var connectedClients = [];
socket
    .on('client id', function (id) {
    for (var i = 0; i < id.length; i++) {
        if (socket.id == id[i]) {
            thisClientID = id[i];
        }
    }
})
    .on('client name', function (names) {
    thisClientName = names.shift().toString();
    client.id = thisClientID;
    client.name = thisClientName;
    socket.emit('object: client', client);
    socket.emit('clients name', names);
    if (client.name == 'Player_1') {
        player_1.model.control = true;
    }
    if (client.name == 'Player_2') {
        player_2.model.control = true;
    }
    if (client.name == 'Player_3') {
        player_3.model.control = true;
    }
})
    .on('client connected', function (client) {
    ul.append('<li class="sys-msg player-connected">' + client + ' подключился</li>');
    socket.on('chat message', function (msg) {
        ul.append('<li>' + msg + '</li>');
        // ul.append('<li><b>' + player + '</b>: ' + msg + '</li>');
    });
})
    .on('client disconnected', function (client) {
    connectedList.append('<li class="player-connected">' + client + '</li>');
    ul.append('<li class="sys-msg player-connected">' + client + ' отключился</li>');
})
    .on('clients connected', function (clients) {
    connectedClients = clients;
    removeClientList();
    for (var i = 0; i < connectedClients.length; i++) {
        connectedList.append('<li class="player-connected">' + connectedClients[i].name + '</li>');
    }
    $('#lobby .players-list li a').on('click', function (e) {
        e.preventDefault();
        if (connectedClients) {
            removeClientList();
            removeClientFromList(function () {
                for (var i = 0; i < connectedClients.length; i++) {
                    connectedList.append('<li class="player-connected">' + connectedClients[i].name + '</li>');
                }
                socket.emit('clients connected update', connectedClients);
            });
        }
    });
});
function removeClientFromList(callback) {
    for (var i = 0; i < connectedClients.length; i++) {
        if (connectedClients[i].name == thisClientName) {
            connectedClients.splice(i, 1);
        }
    }
    callback();
}
function removeClientList() {
    connectedList.remove();
    $('#lobby .connected').append('<ul></ul>');
    connectedList = $('#lobby .connected ul');
}
/// <reference path="socket.ts"/>
socket
    .on('connect', function () {
    ul.append('<li class="sys-msg">Соединение установлено</li>');
    form.on('submit', sendMessage);
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
function sendMessage() {
    socket.emit('chat message', $('#user-message').val());
    $('#user-message').val('');
    return false;
}
;
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
function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
}
var Game = (function () {
    function Game() {
        this.status = 'lobby';
        this.Display = {
            width: 940,
            height: 580,
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
var SpaceBlock = (function (_super) {
    __extends(SpaceBlock, _super);
    function SpaceBlock(params) {
        _super.call(this, {
            blocked: true,
            destroy: false
        });
        this.texture = PIXI.Texture.fromImage('../img/map/space_block.png');
        this.model = new PIXI.Sprite(this.texture);
        this.model._a_name = 'space block';
        this.model.position.x = params.x;
        this.model.position.y = params.y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.model.size = this.size;
        this.model.blocked = this.blocked;
        this.model.destroy = this.destroy;
    }
    ;
    return SpaceBlock;
}(Block));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(params, texture) {
        if (texture === void 0) { texture = PIXI.Texture.fromImage('../img/players/player_1/player_1.png'); }
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
    function Bomb(params, texture) {
        if (texture === void 0) { texture = PIXI.Texture.fromImage('../img/players/bomb.png'); }
        _super.call(this, {
            blocked: true,
            destroy: true
        });
        this.waveLevel = {
            size: null,
            level: 1,
            wave: null
        };
        this.texture = texture;
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
        this.texture = PIXI.Texture.fromImage('../img/map/wall.png');
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
        this.texture = PIXI.Texture.fromImage('../img/map/box.png');
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
        this.texture = PIXI.Texture.fromImage('../img/map/landscape/sand.png');
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
//=== DEPENDING ON ===//
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/pixi.js/pixi.js.d.ts"/>
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
//=== IMPORT FILES ===//
/// <reference path="socket/socket.ts"/>
/// <reference path="socket/game.ts"/>
/// <reference path="socket/lobby.ts"/>
/// <reference path="socket/chat.ts"/>
/// <reference path="functions.ts"/>
/// <reference path="classes/Game.ts"/>
/// <reference path="classes/WorldMap.ts"/>
/// <reference path="gameplay_classes/Block.ts"/>
/// <reference path="gameplay_classes/SpaceBlock.ts"/>
/// <reference path="gameplay_classes/Player.ts"/>
/// <reference path="gameplay_classes/Bomb.ts"/>
/// <reference path="gameplay_classes/Wall.ts"/>
/// <reference path="gameplay_classes/Box.ts"/>
/// <reference path="gameplay_classes/landscape/Sand.ts"/>
//=== CODE ===//
var GAME = new Game;
var WORLD_MAP = new WorldMap;
var player_1 = new Player({ x: 0, y: 0 });
var player_2 = new Player({ x: 320, y: 320 }, PIXI.Texture.fromImage('../img/players/player_2/player_2.png'));
var player_3 = new Player({ x: 0, y: 320 }, PIXI.Texture.fromImage('../img/players/player_3/player_3.png'));
var thisClientID;
var thisClientName;
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
// Create Arrays for spacebar
createMap(function () {
    // Add Destroy Objects
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
    // Create ObjectContainers
    for (var key4 in WORLD_MAP.containers) {
        objectContainers.push(WORLD_MAP.containers[key4]);
    }
});
/// <reference path="hotkeys.ts"/>
// UI
/// <reference path="game_ui.ts"/>
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
                },
                Pause: {
                    val: 80,
                    action: function () {
                        keyPause().pressed();
                    }
                }
            }
        };
        this.Joystick = {};
    }
    return Controls;
}());
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/game.ts"/>
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
                        var currentPlayer = players[o];
                        currentPlayer.canMove.Down = true;
                        for (var j = 0; j < blocked_objects.length; j++) {
                            if (blocked_objects[j].blocked) {
                                for (var i = 0; i < objects.length; i++) {
                                    if (!(currentPlayer.position.x != objects[i].position.x ||
                                        currentPlayer.position.y != (objects[i].position.y - blocked_objects[j].size))) {
                                        currentPlayer.canMove.Down = false;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < objects[j].children.length; i++) {
                                    if (!(currentPlayer.position.x != objects[i].position.x ||
                                        currentPlayer.position.y != (objects[i].position.y - blocked_objects[j].size))) {
                                        currentPlayer.canMove.Down = true;
                                    }
                                }
                            }
                        } // End main For
                        if (currentPlayer.control && currentPlayer.canMove.Down && currentPlayer.position.y < (GAME.Display.height - currentPlayer.size)) {
                            currentPlayer.position.y += 1 * currentPlayer.speed;
                            if (GAME.Display.scroll) {
                                currentPlayer.camera.y += 1 * currentPlayer.speed;
                                currentPlayer.camera.move(currentPlayer.camera.y, 'y');
                            }
                        }
                        socket.emit('player_' + (o + 1) + ' face', '../img/players/player_' + (o + 1) + '/player_' + (o + 1) + '_bottom.png');
                        socket.emit('player_' + (o + 1) + ' moving', currentPlayer.position);
                    } // End if -> players.controls
                } // End Players For
            }); // End createArrays Function
        } // End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/game.ts"/>
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
                        var currentPlayer = players[o];
                        currentPlayer.canMove.Up = true;
                        for (var j = 0; j < blocked_objects.length; j++) {
                            if (blocked_objects[j].blocked) {
                                for (var i = 0; i < objects.length; i++) {
                                    if (!(currentPlayer.position.x != objects[i].position.x ||
                                        currentPlayer.position.y != (objects[i].position.y + blocked_objects[j].size))) {
                                        currentPlayer.canMove.Up = false;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < objects[j].children.length; i++) {
                                    if (!(currentPlayer.position.x != objects[i].position.x ||
                                        currentPlayer.position.y != (objects[i].position.y + blocked_objects[j].size))) {
                                        currentPlayer.canMove.Up = true;
                                    }
                                }
                            }
                        } // End main For
                        if (currentPlayer.control && currentPlayer.canMove.Up && currentPlayer.position.y > 0) {
                            currentPlayer.position.y -= 1 * currentPlayer.speed;
                            if (GAME.Display.scroll) {
                                currentPlayer.camera.y -= 1 * currentPlayer.speed;
                                currentPlayer.camera.move(currentPlayer.camera.y, 'y');
                            }
                        }
                        socket.emit('player_' + (o + 1) + ' face', '../img/players/player_' + (o + 1) + '/player_' + (o + 1) + '_top.png');
                        socket.emit('player_' + (o + 1) + ' moving', currentPlayer.position);
                    } // End if -> players.controls
                } // End Players For 
            }); // End createArrays Function
        } // End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/game.ts"/>
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
                        var currentPlayer = players[o];
                        currentPlayer.canMove.Right = true;
                        for (var j = 0; j < blocked_objects.length; j++) {
                            if (blocked_objects[j].blocked) {
                                for (var i = 0; i < objects.length; i++) {
                                    if (!(currentPlayer.position.x != objects[i].position.x - blocked_objects[j].size ||
                                        currentPlayer.position.y != objects[i].position.y)) {
                                        currentPlayer.canMove.Right = false;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < objects[j].children.length; i++) {
                                    if (!(currentPlayer.position.x != (objects[i].position.x - blocked_objects[j].size) ||
                                        currentPlayer.position.y != objects[i].position.y)) {
                                        currentPlayer.canMove.Right = true;
                                    }
                                }
                            }
                        } // End main For
                        if (currentPlayer.control && currentPlayer.canMove.Right && currentPlayer.position.x < (GAME.Display.width - currentPlayer.size)) {
                            currentPlayer.position.x += 1 * currentPlayer.speed;
                            if (GAME.Display.scroll) {
                                currentPlayer.camera.x += 1 * currentPlayer.speed;
                                currentPlayer.camera.move(currentPlayer.camera.x, 'x');
                            }
                        }
                        socket.emit('player_' + (o + 1) + ' face', '../img/players/player_' + (o + 1) + '/player_' + (o + 1) + '_right.png');
                        socket.emit('player_' + (o + 1) + ' moving', currentPlayer.position);
                    } // End if -> players.controls
                } // End Players For 
            }); // End createArrays Function
        } // End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/game.ts"/>
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
                        var currentPlayer = players[o];
                        currentPlayer.canMove.Left = true;
                        for (var j = 0; j < blocked_objects.length; j++) {
                            if (blocked_objects[j].blocked) {
                                for (var i = 0; i < objects.length; i++) {
                                    if (!(currentPlayer.position.x != (objects[i].position.x + blocked_objects[j].size) ||
                                        currentPlayer.position.y != objects[i].position.y)) {
                                        currentPlayer.canMove.Left = false;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < objects[j].children.length; i++) {
                                    if (!(currentPlayer.position.x != (objects[i].position.x + blocked_objects[j].size) ||
                                        currentPlayer.position.y != objects[i].position.y)) {
                                        currentPlayer.canMove.Left = true;
                                    }
                                }
                            }
                        } // End main For
                        if (currentPlayer.control && currentPlayer.canMove.Left && currentPlayer.position.x > 0) {
                            currentPlayer.position.x -= 1 * currentPlayer.speed;
                            if (GAME.Display.scroll) {
                                currentPlayer.camera.x -= 1 * currentPlayer.speed;
                                currentPlayer.camera.move(currentPlayer.camera.x, 'x');
                            }
                        }
                        socket.emit('player_' + (o + 1) + ' face', '../img/players/player_' + (o + 1) + '/player_' + (o + 1) + '_left.png');
                        socket.emit('player_' + (o + 1) + ' moving', currentPlayer.position);
                    } // End if -> players.controls
                } // End Players For
            }); // End createArrays Function
        } // End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/game.ts"/>
function keySpacebar() {
    function showBombsValue(value, staticValue) {
        $('#bar span.bombs').text('bombs: ' + value + ' / ' + staticValue);
    }
    return {
        pressed: function () {
            var _loop_1 = function() {
                if (players[o].control) {
                    currentPlayer = players[o];
                    currentPlayer.position.bombImg = '../img/players/player_' + (o + 1) + '/player_' + (o + 1) + '_bomb.png';
                    if (currentPlayer.bombsCount > 0) {
                        showBombsValue(currentPlayer.bombsCount, currentPlayer.bombsValue);
                        if (WORLD_MAP.containers.bombs.children.length === 0) {
                            socket.emit('bomb coords', currentPlayer.position);
                            bomb = new Bomb({ x: currentPlayer.position.x, y: currentPlayer.position.y, waveLevel: 1 }, PIXI.Texture.fromImage(currentPlayer.position.bombImg));
                            WORLD_MAP.containers.bombs.addChild(bomb.model);
                            if (bomb) {
                                var _firstBomb_1 = bomb;
                                setTimeout(function () {
                                    if (destroyObjects.length !== 0) {
                                        bombBang(_firstBomb_1);
                                    }
                                    else {
                                        socket.emit('bomb coords_remove', _firstBomb_1.model.position);
                                    }
                                }, 1000);
                            }
                        }
                        else if (currentPlayer.position.x !== bomb.model.position.x || currentPlayer.position.y !== bomb.model.position.y) {
                            socket.emit('bomb coords', currentPlayer.position);
                            bomb = new Bomb({ x: currentPlayer.position.x, y: currentPlayer.position.y, waveLevel: 1 }, PIXI.Texture.fromImage(currentPlayer.position.bombImg));
                            WORLD_MAP.containers.bombs.addChild(bomb.model);
                            if (bomb) {
                                var _otherBomb_1 = bomb;
                                setTimeout(function () {
                                    if (destroyObjects.length !== 0) {
                                        bombBang(_otherBomb_1);
                                    }
                                    else {
                                        socket.emit('bomb coords_remove', _otherBomb_1.model.position);
                                    }
                                }, 1000);
                            }
                        }
                    }
                    // remove bombImg from player.position for decrease player.position size
                    delete currentPlayer.position.bombImg;
                } // End Main If
            };
            var currentPlayer;
            for (var o = 0; o < players.length; o++) {
                _loop_1();
            } // End Main For
        }
    };
    function bombBang(bomb) {
        for (var i = 0; i < destroyObjects.length; i++) {
            if (bomb.model.position.y === (destroyObjects[i].position.y - bomb.waveLevel.wave) &&
                bomb.model.position.x === destroyObjects[i].position.x ||
                bomb.model.position.y === (destroyObjects[i].position.y + bomb.waveLevel.wave) &&
                    bomb.model.position.x === destroyObjects[i].position.x ||
                bomb.model.position.x === (destroyObjects[i].position.x - bomb.waveLevel.wave) &&
                    bomb.model.position.y === destroyObjects[i].position.y ||
                bomb.model.position.x === (destroyObjects[i].position.x + bomb.waveLevel.wave) &&
                    bomb.model.position.y === destroyObjects[i].position.y ||
                bomb.model.position.x === destroyObjects[i].position.x &&
                    bomb.model.position.y === destroyObjects[i].position.y) {
                // ..done ->
                socket.emit('bomb coords_remove', bomb.model.position);
                for (var z = 0; z < objectContainers.length; z++) {
                    // findArrayValue - global function from ./functions.ts
                    socket.emit('bomb bang', findArrayValue(destroyObjects, destroyObjects[i]));
                }
            }
            else {
                socket.emit('bomb coords_remove', bomb.model.position);
            }
        }
    }
}
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/game.ts"/>
function keyPause() {
    return {
        pressed: function () {
            if ($('#game').hasClass('paused')) {
                socket.emit('pause', 'running');
            }
            else {
                socket.emit('pause', 'paused');
            }
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
/// <reference path="hotkeys_methods/Pause.ts"/>
var CONTROLS = new Controls;
var bomb;
if (GAME.Display.scroll) {
    player_1.camera.x += player_1.model.position.x;
    player_1.camera.y += player_1.model.position.y;
    $('canvas').css({ marginLeft: -player_1.camera.x + 'px',
        marginTop: -player_1.camera.y + 'px' });
}
$(document).on('keydown', function (e) {
    if (GAME.status == 'running') {
        // Disable all default key-events
        // if (e.stopPropagation) {
        //   e.stopPropagation();
        //   e.preventDefault();
        // }
        switch (e.which) {
            case CONTROLS.Keyboard.key.arrowDown.val:
                ////
                CONTROLS.Keyboard.key.arrowDown.action();
                ////
                break;
            case CONTROLS.Keyboard.key.arrowUp.val:
                ////
                CONTROLS.Keyboard.key.arrowUp.action();
                ////
                break;
            case CONTROLS.Keyboard.key.arrowRight.val:
                ////
                CONTROLS.Keyboard.key.arrowRight.action();
                ////
                break;
            case CONTROLS.Keyboard.key.arrowLeft.val:
                ////
                CONTROLS.Keyboard.key.arrowLeft.action();
                ////
                break;
            case CONTROLS.Keyboard.key.Spacebar.val:
                ////
                CONTROLS.Keyboard.key.Spacebar.action();
                ////
                break;
            // Pause
            case CONTROLS.Keyboard.key.Pause.val:
                ////
                CONTROLS.Keyboard.key.Pause.action();
                ////
                break;
        }
    }
    if (GAME.status == 'paused') {
        switch (e.which) {
            case CONTROLS.Keyboard.key.Pause.val:
                ////
                CONTROLS.Keyboard.key.Pause.action();
                ////
                break;
        }
    }
});
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
/// <reference path="app.ts"/>
/// <reference path="socket/socket.ts"/>
// One Page App
var ui;
(function (ui) {
    // UI
    // Lobby
    // Lists
    $('#lobby .players-list li a').on('click', function (e) {
        e.preventDefault();
        if (thisClientName != '') {
            if (!($('#lobby .btn.ready').hasClass('active'))) {
                if ($(this).text() == 'Пустой слот') {
                    $(this).html('<i>' + thisClientName + '</i>')
                        .parent()
                        .parent()
                        .children()
                        .eq(prevSlot)
                        .children('a')
                        .text('Пустой слот');
                    prevSlot = $(this).parent().index();
                }
            }
        }
    });
    $('#lobby .spectators-list li a').on('click', function (e) {
        e.preventDefault();
        // if (!($('#lobby .btn.ready').hasClass('active'))) {
        //   if ($(this).text() == 'Пустой слот') {
        //       $(this).html('<i>' + thisClientName + '</i>')
        //                  .parent()
        //                  .parent()
        //                  .children()
        //                  .eq(prevSlot)
        //                  .children('a')
        //                  .text('Пустой слот');
        //       prevSlot = $(this).parent().index();
        //   }
        // }
    });
    // Ready Button
    $('#lobby .btn.ready').on('click', function () {
        $(this).toggleClass('active');
    });
    // Lobby end
    $(window).on('gamepadconnection', function (e) {
        console.log('gamepad-connected!');
    });
    $('aside nav li.game').addClass('active');
    location.href = '#/lobby';
    $('section').stop().fadeOut(200);
    $('#lobby').stop().fadeIn(200);
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
        height: GAME.Display.height + 'px'
    });
    for (var i = 0; i < 289; i++) {
        $('#game #game-display  #grid').append('<i class="map-tile"></i>');
    }
    // Bar
    // var staticBombsCount = player_1.model.bombsCount;
    $('#game #bar .row').prepend('<div class="col-md-9"></div>');
    $('#game #bar .col-md-9').append('<span class="hp">hp: <b>100 / 100</b></span>');
    // $('#game #bar .col-md-9').append('<span class="bombs">bombs: <b>'+staticBombsCount+' / '+staticBombsCount+'</b></span>');
    // Asides
    $('body').css({ height: $(window).innerHeight() });
    $('body #main-row > .col-md-1:first-child').css({ height: $('body').innerHeight() });
    // Chat
    $('#chat').css({
        height: $('body').innerHeight() + 'px'
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
