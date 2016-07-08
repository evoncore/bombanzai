
class Box extends Block
{

  texture;
  model;

  constructor(texture, x, y) {
    super({
      blocked: true,
      destroy: true
    });

    this.texture = texture;

    this.model = new PIXI.Sprite(this.texture);

    this.model._a_name = 'box'; 

    this.model.position.x = x;
    this.model.position.y = y;

    this.model.width = this.size;
    this.model.height = this.size;

    this.model.size = this.size;
    this.model.blocked = this.blocked;
    this.model.destroy = this.destroy;
  }

}