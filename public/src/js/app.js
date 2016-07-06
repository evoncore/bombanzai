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
            width: 1000,
            height: 1000
        };
    }
    return Game;
}());
var WorldMap = (function () {
    function WorldMap() {
        this.containers = {
            // Main Container
            map: new PIXI.Container(),
            // in Map Container
            players: new PIXI.Container(),
            bombs: new PIXI.Container(),
            walls: new PIXI.Container()
        };
    }
    return WorldMap;
}());
var Block = (function () {
    function Block(isBlocked) {
        this.size = 20;
        this.blocked = false;
        this.blocked = isBlocked;
    }
    return Block;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(texture, x, y) {
        _super.call(this, true);
        this.camera = {
            x: -460,
            y: -240,
            show: function (coord, vector) {
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
        this.model.position.x = x;
        this.model.position.y = y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.speed = this.size;
    }
    ;
    Player.prototype.setCamera = function (x, y) {
        this.camera.x = x;
        this.camera.y = y;
    };
    return Player;
}(Block));
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb(texture, x, y) {
        _super.call(this, true);
        this.texture = texture;
        this.model = new PIXI.Sprite(this.texture);
        this.model.position.x = x;
        this.model.position.y = y;
        this.model.width = this.size;
        this.model.height = this.size;
    }
    ;
    return Bomb;
}(Block));
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(texture, x, y) {
        _super.call(this, true);
        this.texture = texture;
        this.model = new PIXI.Sprite(this.texture);
        this.model.position.x = x;
        this.model.position.y = y;
        this.model.width = this.size;
        this.model.height = this.size;
    }
    return Wall;
}(Block));
/// <reference path="app.ts"/>
// end declare
var socket = io('', {
    'reconnection delay': 1,
    'reconnectionAttempts': 10
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
function keyArrowDown() {
    return {
        pressed: function () {
            if (plm_1.position.y < (game.Display.height - exampleBlock.size)) {
                plm_1.canMove.Down = true;
                if (exampleWall.blocked) {
                    for (var i = 0; i < worldMap.containers.walls.children.length; i++) {
                        if (plm_1.position.x != worldMap.containers.walls.children[i].position.x || plm_1.position.y != (worldMap.containers.walls.children[i].position.y - exampleWall.size)) {
                        }
                        else {
                            plm_1.canMove.Down = false;
                        }
                    }
                    if (plm_1.canMove.Down) {
                        plm_1.position.y += 1 * player_1.speed;
                        player_1.camera.y += 1 * player_1.speed;
                    }
                    player_1.camera.show(player_1.camera.y, 'y');
                }
                else {
                    plm_1.position.y += 1 * player_1.speed;
                    player_1.camera.y += 1 * player_1.speed;
                    player_1.camera.show(player_1.camera.y, 'y');
                }
            }
        }
    };
}
/// <reference path="../hotkeys.ts"/>
function keyArrowUp() {
    return {
        pressed: function () {
            if (plm_1.position.y > 0) {
                plm_1.canMove.Up = true;
                if (exampleWall.blocked) {
                    for (var i = 0; i < worldMap.containers.walls.children.length; i++) {
                        if (plm_1.position.x != worldMap.containers.walls.children[i].position.x || plm_1.position.y != (worldMap.containers.walls.children[i].position.y + exampleWall.size)) {
                        }
                        else {
                            plm_1.canMove.Up = false;
                        }
                    }
                    if (plm_1.canMove.Up) {
                        plm_1.position.y -= 1 * player_1.speed;
                        player_1.camera.y -= 1 * player_1.speed;
                    }
                    player_1.camera.show(player_1.camera.y, 'y');
                }
                else {
                    plm_1.position.y -= 1 * player_1.speed;
                    player_1.camera.y -= 1 * player_1.speed;
                    player_1.camera.show(player_1.camera.y, 'y');
                }
            }
        }
    };
}
/// <reference path="../hotkeys.ts"/>
function keyArrowRight() {
    return {
        pressed: function () {
            if (plm_1.position.x < (game.Display.width - exampleBlock.size)) {
                plm_1.canMove.right = true;
                if (exampleWall.blocked) {
                    for (var i = 0; i < worldMap.containers.walls.children.length; i++) {
                        if (plm_1.position.x != (worldMap.containers.walls.children[i].position.x - exampleWall.size) || plm_1.position.y != worldMap.containers.walls.children[i].position.y) {
                        }
                        else {
                            plm_1.canMove.right = false;
                        }
                    }
                    if (plm_1.canMove.right) {
                        plm_1.position.x += 1 * player_1.speed;
                        player_1.camera.x += 1 * player_1.speed;
                    }
                    player_1.camera.show(player_1.camera.x, 'x');
                }
                else {
                    plm_1.position.x += 1 * player_1.speed;
                    player_1.camera.x += 1 * player_1.speed;
                    player_1.camera.show(player_1.camera.x, 'x');
                }
            }
        }
    };
}
/// <reference path="../hotkeys.ts"/>
function keyArrowLeft() {
    return {
        pressed: function () {
            if (plm_1.position.x > 0) {
                plm_1.canMove.left = true;
                if (exampleWall.blocked) {
                    for (var i = 0; i < worldMap.containers.walls.children.length; i++) {
                        if (plm_1.position.x != (worldMap.containers.walls.children[i].position.x + exampleWall.size) || plm_1.position.y != worldMap.containers.walls.children[i].position.y) {
                        }
                        else {
                            plm_1.canMove.left = false;
                        }
                    }
                    if (plm_1.canMove.left) {
                        plm_1.position.x -= 1 * player_1.speed;
                        player_1.camera.x -= 1 * player_1.speed;
                    }
                    player_1.camera.show(player_1.camera.x, 'x');
                }
                else {
                    plm_1.position.x -= 1 * player_1.speed;
                    player_1.camera.x -= 1 * player_1.speed;
                    player_1.camera.show(player_1.camera.x, 'x');
                }
            }
        }
    };
}
/// <reference path="../hotkeys.ts"/>
function keySpacebar() {
    return {
        pressed: function () {
            if (worldMap.containers.bombs.children.length == 0) {
                bomb = new Bomb(PIXI.Texture.fromImage('../img/bomb.png'), plm_1.position.x, plm_1.position.y);
                worldMap.containers.bombs.addChild(bomb.model);
                if (bomb) {
                    var _firstBomb_1 = bomb;
                    setTimeout(function () {
                        worldMap.containers.bombs.removeChild(_firstBomb_1.model);
                    }, 2000);
                }
            }
            else if (plm_1.position.x != bomb.model.position.x || plm_1.position.y != bomb.model.position.y) {
                bomb = new Bomb(PIXI.Texture.fromImage('../img/bomb.png'), plm_1.position.x, plm_1.position.y);
                worldMap.containers.bombs.addChild(bomb.model);
                if (bomb) {
                    var _otherBomb_1 = bomb;
                    setTimeout(function () {
                        worldMap.containers.bombs.removeChild(_otherBomb_1.model);
                    }, 2000);
                }
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
var controls = new Controls;
var bomb;
player_1.camera.x += plm_1.position.x;
player_1.camera.y += plm_1.position.y;
$('canvas').css({ marginLeft: -player_1.camera.x + 'px' });
$('canvas').css({ marginTop: -player_1.camera.y + 'px' });
$(document).on('keydown', function (e) {
    // Disable all default key-events
    // if (e.stopPropagation) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }
    switch (e.which) {
        case controls.Keyboard.key.arrowDown.val:
            ////
            // if (!two_keys) {
            controls.Keyboard.key.arrowDown.action();
            // }
            ////
            break;
        case controls.Keyboard.key.arrowUp.val:
            ////
            // if (!two_keys) {
            controls.Keyboard.key.arrowUp.action();
            // }
            ////
            break;
        case controls.Keyboard.key.arrowRight.val:
            ////
            // if (!two_keys) {
            controls.Keyboard.key.arrowRight.action();
            // }
            ////
            break;
        case controls.Keyboard.key.arrowLeft.val:
            ////
            // if (!two_keys) {
            controls.Keyboard.key.arrowLeft.action();
            // }
            ////
            break;
        case controls.Keyboard.key.Spacebar.val:
            ////
            controls.Keyboard.key.Spacebar.action();
            ////
            break;
    }
});
// // Top Left
// twoKeysDown(
//   function() {
//     controls.Keyboard.key.arrowUp.action();
//     controls.Keyboard.key.arrowLeft.action();
//   },
//   controls.Keyboard.key.arrowUp.val,
//   controls.Keyboard.key.arrowLeft.val
// );
// // Top Right
// twoKeysDown(
//   function() {
//     controls.Keyboard.key.arrowUp.action();
//     controls.Keyboard.key.arrowRight.action();
//   },
//   controls.Keyboard.key.arrowUp.val,
//   controls.Keyboard.key.arrowRight.val
// );
// // Bottom Left
// twoKeysDown(
//   function() {
//     controls.Keyboard.key.arrowDown.action();
//     controls.Keyboard.key.arrowLeft.action();
//   },
//   controls.Keyboard.key.arrowDown.val,
//   controls.Keyboard.key.arrowLeft.val
// );
// // Bottom Right
// twoKeysDown(
//   function() {
//     controls.Keyboard.key.arrowDown.action();
//     controls.Keyboard.key.arrowRight.action();
//   },
//   controls.Keyboard.key.arrowRight.val,
//   controls.Keyboard.key.arrowDown.val
// );
function twoKeysDown(func, key1, key2) {
    var codes = [].slice.call(arguments, 1);
    var pressed = {};
    $(document).on('keydown', function (e) {
        pressed[e.keyCode] = true;
        for (var i = 0; i < codes.length; i++) {
            if (!pressed[codes[i]]) {
                return;
            }
        }
        // if want one click
        // pressed = {};
        func();
    });
    $(document).on('keyup', function (e) {
        delete pressed[e.keyCode];
    });
}
/// <reference path="app.ts"/>
// One Page App
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
            $('#bar').stop().animate({ opacity: 0 }, 0);
            $('#chat').stop().animate({
                height: $('body').innerHeight()
            }, 300);
        }
        else {
            $('#chat').stop().animate({
                height: $('#game #game-display').height()
            }, 300, function () {
                $('#bar').stop().animate({ opacity: 1 }, 300);
            });
        }
    }
});
// Exit Button
$('aside nav li.exit a').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/',
        method: 'POST',
        data: 'exit-app',
        complete: function () {
            console.log('exiting...');
        },
        statusCode: {
            200: function () {
                console.log('done!');
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    return false;
});
// Grid
$('#game #game-display').append('<div id="grid"></div>');
$('#game #game-display #grid').css({
    width: game.Display.width + 'px',
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
    height: $('#game #game-display').height()
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
