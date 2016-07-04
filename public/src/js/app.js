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
            width: 1200,
            height: 800
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
        this.texture = texture;
        this.model = new PIXI.Sprite(this.texture);
        this.model.position.x = x;
        this.model.position.y = y;
        this.model.width = this.size;
        this.model.height = this.size;
        this.speed = this.size;
    }
    ;
    Player.prototype.camera = function () {
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
            if (plm_1.position.y < 780) {
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
                    }
                }
                else {
                    plm_1.position.y += 1 * player_1.speed;
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
                    }
                }
                else {
                    plm_1.position.y -= 1 * player_1.speed;
                }
            }
        }
    };
}
/// <reference path="../hotkeys.ts"/>
function keyArrowRight() {
    return {
        pressed: function () {
            if (plm_1.position.x < 1300) {
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
                    }
                }
                else {
                    plm_1.position.x += 1 * player_1.speed;
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
                    }
                }
                else {
                    plm_1.position.x -= 1 * player_1.speed;
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
                    }, 1000);
                }
            }
            else if (plm_1.position.x != bomb.model.position.x || plm_1.position.y != bomb.model.position.y) {
                bomb = new Bomb(PIXI.Texture.fromImage('../img/bomb.png'), plm_1.position.x, plm_1.position.y);
                worldMap.containers.bombs.addChild(bomb.model);
                if (bomb) {
                    var _otherBomb_1 = bomb;
                    setTimeout(function () {
                        worldMap.containers.bombs.removeChild(_otherBomb_1.model);
                    }, 1000);
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
$(document).on('keydown', function (e) {
    // if (e.stopPropagation) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }
    switch (e.which) {
        case controls.Keyboard.key.arrowDown.val:
            ////
            controls.Keyboard.key.arrowDown.action();
            ////
            break;
        case controls.Keyboard.key.arrowUp.val:
            ////
            controls.Keyboard.key.arrowUp.action();
            ////
            break;
        case controls.Keyboard.key.arrowRight.val:
            ////
            controls.Keyboard.key.arrowRight.action();
            ////
            break;
        case controls.Keyboard.key.arrowLeft.val:
            ////
            controls.Keyboard.key.arrowLeft.action();
            ////
            break;
        case controls.Keyboard.key.Spacebar.val:
            ////
            controls.Keyboard.key.Spacebar.action();
            ////
            break;
    }
});
// One Page App
$('aside nav a.game').addClass('active');
location.href = '#/game';
$('section').stop().fadeOut(200);
$('#game').stop().fadeIn(200);
$('aside nav a').on('click', function (e) {
    e.preventDefault();
    if (!(this.classList.contains('active'))) {
        var urlPattern = /[a-z]+$/g;
        var url = this.href.match(urlPattern);
        if (url == null)
            url = 'info';
        location.href = '#/' + url;
        $(this).addClass('active')
            .parent()
            .siblings()
            .children('a')
            .removeClass('active');
        $('section').stop().fadeOut(200);
        $('#' + url).stop().fadeIn(200);
    }
});
// Game Display
$('#game #game-display').append('<div id="grid"></div>');
$('#game #game-display #grid').css({
    width: game.Display.width + 1 + 'px',
    top: $('#game #game-display').css('top')
});
// Grid
for (var i = 0; i < 1104; i++) {
    $('#game #game-display  #grid').append('<i class="map-tile"></i>');
}
// Chat
$('#game').prepend('<div id="chat"></div>');
if ($('canvas')[0]) {
    $('#game #chat').css({ height: Math.abs($('#game #game-display').offset().top / 4) + 'px' });
}
$('#game #chat').append('<h3>Chat</h3>');
$('#game #chat').append('<p>message 1</p>');
$('#game #chat').append('<p>message 2</p>');
// Asides
$('body').css({ height: $(window).innerHeight() });
$('body #main-row > .col-md-1').css({ height: $('body').innerHeight() });
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
});
