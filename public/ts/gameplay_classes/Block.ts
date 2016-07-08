
class Block
{

  size = 20;
  blocked = false;
  destroy = false;

  constructor(params) {
    this.blocked = params.blocked;
    this.destroy = params.destroy;
  }

}