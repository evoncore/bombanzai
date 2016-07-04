var stage = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer(960, 448, { backgroundColor: 0x333333 });

document.body.appendChild(renderer.view);

$('canvas').attr('id', 'game-display');

requestAnimationFrame( animate );

var textureBox = PIXI.Texture.fromImage('../img/box.png');
var box = new PIXI.Sprite(textureBox);
var speed = 20;

var graphics = new PIXI.Graphics();

graphics.beginFill(0x333333, 1);
var eshtu = graphics.drawRect(0, 0, 16, 16);

eshtu.position.x = 200;
eshtu.position.y = 150;

box.position.x = 300;
box.position.y = 175;
box.scale.x = 0.3;
box.scale.y = 0.3;

stage.addChild(eshtu);
stage.addChild(box);
stage.addChild(graphics);

function animate() {
  requestAnimationFrame( animate );

  renderer.render(stage);
}

var Keyboard = {
  key: {
    arrowUp: 38,
    arrowDown: 40,
    arrowLeft: 37,
    arrowRight: 39,
    Spacebar: 32
  }
};

$(document).on('keydown', function(e) {

  switch (e.which) {
    case Keyboard.key.arrowDown:
      if (eshtu.y < 430) {
        eshtu.y += 1 * speed;
      }
      break;
    case Keyboard.key.arrowUp:
      if (eshtu.y > 10) {
        eshtu.y -= 1 * speed;
      }
      break;
    case Keyboard.key.arrowRight:
      if (eshtu.x < 940) {
        eshtu.x += 1 * speed;
      }
      break;
    case Keyboard.key.arrowLeft:
      if (eshtu.x > 0) {
        eshtu.x -= 1 * speed;
      }
      break;
    case Keyboard.key.Spacebar:
      // ..code
      break;
  }

});