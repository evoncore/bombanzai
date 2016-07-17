
class AddWaveLevel extends Block
{

  texture = PIXI.Texture.fromImage('../img/pick-ups/add_wave_level.png');
  model;

  constructor(params) {
    super({
      blocked: false,
      destroy: true
    });

    this.model = new PIXI.Sprite(this.texture);
    this.model._a_name = 'Pick-up: add wave level'; 

    this.model.position.x = params.x;
    this.model.position.y = params.y;

    this.model.width = this.size;
    this.model.height = this.size;

    this.model.size = this.size;
    this.model.blocked = this.blocked;
    this.model.destroy = this.destroy;
  }

}