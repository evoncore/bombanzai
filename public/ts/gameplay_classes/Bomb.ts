
class Bomb extends Block
{

  texture = PIXI.Texture.fromImage('../img/bomb.png');
  model;
  waveLevel = {
    size: null,
    level: 1,
    wave: null
  };

  constructor(params) {
    super({
      blocked: true,
      destroy: true
    });

    this.model = new PIXI.Sprite(this.texture);
    this.model._a_name = 'bomb'; 

    this.model.position.x = params.x;
    this.model.position.y = params.y;

    this.model.width = this.size;
    this.model.height = this.size;

    this.model.size = this.size;
    this.model.blocked = this.blocked;
    this.model.destroy = this.destroy;

    this.waveLevel.size = this.size;
    this.waveLevel.level = params.waveLevel;
    this.waveLevel.wave = this.waveLevel.size * this.waveLevel.level;
  };

}