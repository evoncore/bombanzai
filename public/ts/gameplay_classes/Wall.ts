
class Wall extends Block
{

  texture;
  model;

  constructor(texture, x, y) {
    super(true);

    this.texture = texture;

    this.model = new PIXI.Sprite(this.texture);

    this.model.position.x = x;
    this.model.position.y = y;

    this.model.width = this.size;
    this.model.height = this.size;
  }

}