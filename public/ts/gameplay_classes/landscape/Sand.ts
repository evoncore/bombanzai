
class Sand extends Block
{

  texture = PIXI.Texture.fromImage('../img/sand.svg');
  model;

  constructor(params) {
    super({
      blocked: false,
      destroy: false
    });

    this.model = new PIXI.Sprite(this.texture);
    this.model._a_name = 'sand'; 

    this.model.position.x = params.x ;
    this.model.position.y = params.y ;

    this.model.width = this.size;
    this.model.height = this.size;

    this.model.size = this.size;
    this.model.blocked = this.blocked;
    this.model.destroy = this.destroy;
  }

}