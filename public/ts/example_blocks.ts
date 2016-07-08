// DO NOT TOUCH. Not for dynamic generation; initialized in the code -->

var wallTexture = PIXI.Texture.fromImage('../img/wall.png');
var exampleWall = new Wall(wallTexture, 0, 0);

var boxTexture = PIXI.Texture.fromImage('../img/box.png');
var exampleBox = new Box(wallTexture, 0, 0);

var bombTexture = PIXI.Texture.fromImage('../img/bomb.png');
var exampleBomb = new Bomb(bombTexture, 0, 0, 1);

var exampleBlock = new Block({
  blocked: false,
  destroy: false
});

// <-- end //