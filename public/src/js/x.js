'use strict';

// Object Variables

var Game,
    Controls,
    WorldMap,
    Player,
    Bomb;

// Variables

var renderer;

// Objects

Game = {
  Display: {
    width: 960,
    height: 450
  }
};

Controls = {
  Keyboard: { 
    key: {
      arrowUp: 38,
      arrowDown: 40,
      arrowLeft: 37,
      arrowRight: 39,
      Spacebar: 32
    }
  },
  Joystick: {

  }
};

WorldMap = {
  container: new PIXI.Container()
};

Player = {
  container: new PIXI.Container(),
  texture: PIXI.Texture.fromImage('../img/eshtu.png'),
  model: null,
  speed: 15
};

Bomb = {
  container: new PIXI.Container(),
  texture: PIXI.Texture.fromImage('../img/bomb.png'),
  model: null
};

// Create Canvas

renderer = PIXI.autoDetectRenderer(Game.Display.width, Game.Display.height, { backgroundColor: 0x999999 });
$('#game').append(renderer.view);

// Init Containers

requestAnimationFrame(animate);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(WorldMap.container);
}

WorldMap.container.addChild(Player.container);
WorldMap.container.addChild(Bomb.container);

// Player

Player.model = new PIXI.Sprite(Player.texture);
Player.model.height = 15;
Player.model.width = 15;
Player.model.position.x = 45;
Player.model.position.y = 45;

Player.container.addChild(Player.model);

// Bomb

Bomb.model = new PIXI.Sprite(Bomb.texture);
Bomb.model.height = 9;
Bomb.model.width = 9;

// Controls

$(document).on('keydown', function(e) {

  switch (e.which) {
    case Controls.Keyboard.key.arrowDown:
      if (Player.model.position.y < 430) {
        Player.model.position.y += 1 * Player.speed;
      }
      break;
    case Controls.Keyboard.key.arrowUp:
      if (Player.model.position.y > 0) {
        Player.model.position.y -= 1 * Player.speed;
      }
      break;
    case Controls.Keyboard.key.arrowRight:
      if (Player.model.position.x < 935) {
        Player.model.position.x += 1 * Player.speed;
      }
      break;
    case Controls.Keyboard.key.arrowLeft:
      if (Player.model.position.x > 0) {
        Player.model.position.x -= 1 * Player.speed;
      }
      break;
    case Controls.Keyboard.key.Spacebar:
      Bomb.model.position.x = Player.model.position.x + 3;
      Bomb.model.position.y = Player.model.position.y + 3;
      Bomb.container.addChild(Bomb.model).zIndex = 1;

      setTimeout(function() {
        Bomb.container.removeChild(Bomb.model);
      }, 1000);
      break;
  }

});

// Grid

$('#game').append('<div id="grid"></div>');
$('#game #grid').css({
  width: Game.Display.width + 1 + 'px',
  height: Game.Display.height + 1 + 'px'
});

for (var i = 0; i < 1920; i++) {
  $('#game #grid').append('<i class="map-tile"></i>');
}