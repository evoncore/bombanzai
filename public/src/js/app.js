var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function slicePixels(obj) {
    return Number(obj.length == 5 ? obj.slice(0, 3) : obj.slice(0, 2));
}
var Game = (function () {
    function Game() {
        this.Display = {
            width: 260,
            height: 260,
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
        this.bombsCount = 3;
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
            x: -480,
            y: -280,
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
        this.model.position.x = params.x;
        this.model.position.y = params.y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.model.size = this.size;
        this.model.blocked = this.blocked;
        this.model.destroy = this.destroy;
        this.speed = this.size;
        this.coords.x = params.x;
        this.coords.y = params.y;
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
        this.texture = PIXI.Texture.fromImage('../img/sand.png');
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
/// <reference path="../app.ts"/>
var socket = io('', {
    'reconnectionDelay': 1,
    'reconnectionAttempts': 2
});
var ul = $('#chat ul');
var form = $('#chat form');
form.on('submit', function (e) { e.preventDefault(); });
socket
    .on('chat message', function (msg) {
    ul.append('<li>' + msg + '</li>');
})
    .on('connect', function () {
    ul.append('<li class="sys-msg">Соединение установлено</li>');
    ;
    form.on('submit', sendMessage);
    socket.emit('player moving', player_1.model.position);
    socket
        .on('player coords', function (player_coords) {
        player_1.model.position.x = player_coords.x;
        player_1.model.position.y = player_coords.y;
    });
    socket.emit('user cookie', document.cookie);
    console.log(document.cookie);
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
/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/socket.ts"/>
function keyArrowDown() {
    return {
        pressed: function () {
            var objects = [];
            var blocked_objects = [];
            player_1.canMove.Down = true;
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
                for (var j = 0; j < blocked_objects.length; j++) {
                    if (blocked_objects[j].blocked) {
                        for (var i = 0; i < objects.length; i++) {
                            if (!(player_1.model.position.x != objects[i].position.x ||
                                player_1.model.position.y != (objects[i].position.y - blocked_objects[j].size))) {
                                player_1.canMove.Down = false;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < objects[j].children.length; i++) {
                            if (!(player_1.model.position.x != objects[i].position.x ||
                                player_1.model.position.y != (objects[i].position.y - blocked_objects[j].size))) {
                                player_1.canMove.Down = true;
                            }
                        }
                    }
                } // End main For
                if (player_1.canMove.Down && player_1.model.position.y < (GAME.Display.height - player_1.size)) {
                    player_1.model.position.y += 1 * player_1.speed;
                    if (GAME.Display.scroll) {
                        player_1.camera.y += 1 * player_1.speed;
                        player_1.camera.move(player_1.camera.y, 'y');
                    }
                }
                socket.emit('player moving', player_1.model.position);
            });
        } /// End Pressed Function
    }; // End Return
} // End Function
/// <reference path="../hotkeys.ts"/>
function keyArrowUp() {
    return {
        pressed: function () {
            var objects = [];
            var blocked_objects = [];
            player_1.canMove.Up = true;
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
                        if (push && WORLD_MAP.containers[key].children[key3] != 0) {
                            objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
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
                for (var j = 0; j < blocked_objects.length; j++) {
                    if (blocked_objects[j].blocked) {
                        for (var i = 0; i < objects.length; i++) {
                            if (!(player_1.model.position.x != objects[i].position.x ||
                                player_1.model.position.y != (objects[i].position.y + blocked_objects[j].size))) {
                                player_1.canMove.Up = false;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < objects[j].children.length; i++) {
                            if (!(player_1.model.position.x != objects[i].position.x ||
                                player_1.model.position.y != (objects[i].position.y + blocked_objects[j].size))) {
                                player_1.canMove.Up = true;
                            }
                        }
                    }
                } // End main For
                if (player_1.canMove.Up && player_1.model.position.y > 0) {
                    player_1.model.position.y -= 1 * player_1.speed;
                    if (GAME.Display.scroll) {
                        player_1.camera.y -= 1 * player_1.speed;
                        player_1.camera.move(player_1.camera.y, 'y');
                    }
                }
            });
            socket.emit('player moving', player_1.model.position);
        }
    };
}
/// <reference path="../hotkeys.ts"/>
function keyArrowRight() {
    return {
        pressed: function () {
            var objects = [];
            var blocked_objects = [];
            player_1.canMove.Right = true;
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
                        if (push && WORLD_MAP.containers[key].children[key3] != 0) {
                            objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
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
                for (var j = 0; j < blocked_objects.length; j++) {
                    if (blocked_objects[j].blocked) {
                        for (var i = 0; i < objects.length; i++) {
                            if (!(player_1.model.position.x != (objects[i].position.x - blocked_objects[j].size) ||
                                player_1.model.position.y != objects[i].position.y)) {
                                player_1.canMove.Right = false;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < objects[j].children.length; i++) {
                            if (!(player_1.model.position.x != (objects[i].position.x - blocked_objects[j].size) ||
                                player_1.model.position.y != objects[i].position.y)) {
                                player_1.canMove.Right = true;
                            }
                        }
                    }
                } // End main For
                if (player_1.canMove.Right && player_1.model.position.x < (GAME.Display.height - player_1.size)) {
                    player_1.model.position.x += 1 * player_1.speed;
                    if (GAME.Display.scroll) {
                        player_1.camera.x += 1 * player_1.speed;
                        player_1.camera.move(player_1.camera.x, 'x');
                    }
                }
                socket.emit('player moving', player_1.model.position);
            });
        }
    };
}
/// <reference path="../hotkeys.ts"/>
function keyArrowLeft() {
    return {
        pressed: function () {
            var objects = [];
            var blocked_objects = [];
            player_1.canMove.Left = true;
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
                        if (push && WORLD_MAP.containers[key].children[key3] != 0) {
                            objects.push(WORLD_MAP.containers[key].children[key3]);
                        }
                    }
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
                for (var j = 0; j < blocked_objects.length; j++) {
                    if (blocked_objects[j].blocked) {
                        for (var i = 0; i < objects.length; i++) {
                            if (!(player_1.model.position.x != (objects[i].position.x + blocked_objects[j].size) ||
                                player_1.model.position.y != objects[i].position.y)) {
                                player_1.canMove.Left = false;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < objects[j].children.length; i++) {
                            if (!(player_1.model.position.x != (objects[i].position.x + blocked_objects[j].size) ||
                                player_1.model.position.y != objects[i].position.y)) {
                                player_1.canMove.Left = true;
                            }
                        }
                    }
                } // End main For
                if (player_1.canMove.Left && player_1.model.position.x > 0) {
                    player_1.model.position.x -= 1 * player_1.speed;
                    if (GAME.Display.scroll) {
                        player_1.camera.x -= 1 * player_1.speed;
                        player_1.camera.move(player_1.camera.x, 'x');
                    }
                }
                socket.emit('player moving', player_1.model.position);
            });
        }
    };
}
/// <reference path="../hotkeys.ts"/>
function keySpacebar() {
    function checkPlayer() {
        if (WORLD_MAP.containers.players.children.length === 0) {
            player_1.alive = false;
        }
    }
    function playerPlayerAlive() {
        if (!player_1.alive) {
            setTimeout(function () {
                alert('game over!');
                location.reload();
            }, 200);
        }
    }
    return {
        pressed: function () {
            var destroyObjects = [];
            var objectContainers = [];
            function createArrays(callback) {
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
                for (var key4 in WORLD_MAP.containers) {
                    objectContainers.push(WORLD_MAP.containers[key4]);
                }
                callback();
            }
            createArrays(function () {
                if (WORLD_MAP.containers.bombs.children.length === 0) {
                    bomb = new Bomb({ x: player_1.model.position.x, y: player_1.model.position.y, waveLevel: 1 });
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
                                        WORLD_MAP.containers.bombs.removeChild(_firstBomb_1.model);
                                        for (var o = 0; o < objectContainers.length; o++) {
                                            objectContainers[o].removeChild(destroyObjects[i]);
                                        }
                                        checkPlayer();
                                    }
                                    else {
                                        WORLD_MAP.containers.bombs.removeChild(_firstBomb_1.model);
                                        checkPlayer();
                                    }
                                }
                                playerPlayerAlive();
                            }
                            else {
                                objectContainers[i].removeChild(_firstBomb_1.model);
                                checkPlayer();
                                playerPlayerAlive();
                            }
                        }, 2000);
                    }
                }
                else if (player_1.model.position.x !== bomb.model.position.x || player_1.model.position.y !== bomb.model.position.y) {
                    bomb = new Bomb({ x: player_1.model.position.x, y: player_1.model.position.y, waveLevel: 1 });
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
                                        for (var o = 0; o < objectContainers.length; o++) {
                                            objectContainers[o].removeChild(destroyObjects[i]);
                                        }
                                        checkPlayer();
                                    }
                                    else {
                                        WORLD_MAP.containers.bombs.removeChild(_otherBomb_1.model);
                                        checkPlayer();
                                    }
                                }
                                playerPlayerAlive();
                            }
                            else {
                                WORLD_MAP.containers.bombs.removeChild(_otherBomb_1.model);
                                checkPlayer();
                                playerPlayerAlive();
                            }
                        }, 2000);
                    }
                }
            });
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
var bomb;
var two_keys = false;
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
var wall_1 = new Wall({ x: 80, y: 40 });
var wall_2 = new Wall({ x: 160, y: 60 });
var wall_3 = new Wall({ x: 100, y: 160 });
var box_1 = new Box({ x: 100, y: 100 });
var box_2 = new Box({ x: 160, y: 80 });
var box_3 = new Box({ x: 140, y: 160 });
var sand_1 = new Sand({ x: 0, y: 0 });
var sand_2 = new Sand({ x: 0, y: 20 });
var sand_3 = new Sand({ x: 20, y: 0 });
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
            }
            else {
                $('#chat').stop().animate({
                    height: $('#game #game-display').innerHeight()
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
    $('#game').append('<div id="bar"></div>');
    $('#game #bar').append('<span>hp: <b>100 / 100</b></span>');
    $('#game #bar').append('<span>bombs: <b>∞ / ∞</b></span>');
    // Asides
    $('body').css({ height: $(window).innerHeight() });
    $('body #main-row > .col-md-1:first-child').css({ height: $('body').innerHeight() });
    // Chat
    $('#chat').css({
        height: $('#game #game-display').innerHeight()
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
