
class Player extends Block
{

  texture;
  model;
  speed;
  alive = true;

  constructor(texture, x, y) {
    super({
      blocked: true,
      destroy: true
    });

    this.texture = texture;

    this.model = new PIXI.Sprite(this.texture);

    this.model._a_name = 'player'; 

    this.model.position.x = x;
    this.model.position.y = y;

    this.model.width = this.size;
    this.model.height = this.size;

    this.model.size = this.size;
    this.model.blocked = this.blocked;
    this.model.destroy = this.destroy;

    this.speed = this.size;
  };

  canMove = {
    Up: true,
    Down: true,
    Left: true,
    Right: true
  };

  camera = {
    x: -480,
    y: -280,
    move: function(coord, vector) {
      if (vector == 'y') {
        $('canvas').css({ marginTop: -coord + 'px' });
      } else if (vector == 'x') {
        $('canvas').css({ marginLeft: -coord + 'px' });
      }
    }
  };

}