
class Player extends Block
{

  texture;
  model;
  speed;
  alive = true;
  coords = {
    x: null,
    y: null
  };

  constructor(params, texture = PIXI.Texture.fromImage('../img/player_1.png')) {
    super({
      blocked: true,
      destroy: true
    });

    this.texture = texture;
    this.model = new PIXI.Sprite(this.texture);
    this.model._a_name = 'player';
    this.model.control = false;

    this.model.bombsCount = 1;

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
  };

  canMove = {
    Up: true,
    Down: true,
    Left: true,
    Right: true
  };

  camera = {
    x: -340, // 480
    y: -180, // 280
    move: function(coord, vector) {
      if (vector == 'y') {
        $('canvas').css({ marginTop: -coord + 'px' });
      } else if (vector == 'x') {
        $('canvas').css({ marginLeft: -coord + 'px' });
      }
    }
  };

}