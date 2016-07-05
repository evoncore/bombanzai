
class Player extends Block
{

  texture;
  model;
  speed;

  camera = {
    x: -460,
    y: -240,
    show: function(coord, vector) {
      if (vector == 'y') {
        $('canvas').css({ marginTop: -coord + 'px' });
      } else if (vector == 'x') {
        $('canvas').css({ marginLeft: -coord + 'px' });
      }
    }
  };

  constructor(texture, x, y) {
    super(true);

    this.texture = texture;

    this.model = new PIXI.Sprite(this.texture);

    this.model.position.x = x;
    this.model.position.y = y;

    this.model.width = this.size;
    this.model.height = this.size;

    this.speed = this.size;
  };

  setCamera(x, y) {
    this.camera.x = x;
    this.camera.y = y;
  }

}