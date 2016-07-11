
class Wall extends Block
{

  texture = PIXI.Texture.fromImage('../img/map/wall.png');
  model;

  constructor(params) {
    super({
      blocked: true,
      destroy: false
    });

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

}