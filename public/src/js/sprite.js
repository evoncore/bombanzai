var movie,
    player,
    texture = PIXI.Texture;

var Keyboard = { 
  key: {
    arrowUp: 38,
    arrowDown: 40,
    arrowLeft: 37,
    arrowRight: 39,
    Spacebar: 32
  }
};

PIXI.loader
  .add('js/player.json')
  .load(createPlayer);

$(document).on('keydown', function(e) {

  switch (e.which) {
    case Keyboard.key.arrowDown:
      stage.removeChild(movie);
      movie.y += 1 * speed;
      moveBottom();
      break;
    case Keyboard.key.arrowUp:
      stage.removeChild(movie);
      movie.y -= 1 * speed;
      moveTop();
      break;
    case Keyboard.key.arrowRight:
      stage.removeChild(movie);
      movie.x += 1 * speed;
      moveRight();
      break;
    case Keyboard.key.arrowLeft:
      stage.removeChild(movie);
      movie.x -= 1 * speed;
      moveLeft();
      break;
    case Keyboard.key.Spacebar:
      // ..code
      break;
  }

});

function createPlayer() {
  var frames = [];
  frames.push(texture.fromFrame('player' + 9 + '.png'));
  movie = new PIXI.extras.MovieClip(frames);
  movie.animationSpeed = 0.1;
  stage.addChild(movie);
}

function moveTop() {
  var frames = [];
  var sprites = [0,1,2]

  for (var i = 0; i < sprites.length; i++) {
    frames.push(texture.fromFrame('player' + sprites[i] + '.png'));
  }
  movie = new PIXI.extras.MovieClip(frames);
  movie.animationSpeed = 0.1;
  stage.addChild(movie);

  movie.play();
}

function moveBottom() {
  var frames = [];
  var sprites = [6,7,8]

  for (var i = 0; i < sprites.length; i++) {
    frames.push(PIXI.Texture.fromFrame('player' + sprites[i] + '.png'));
  }
  movie = new PIXI.extras.MovieClip(frames);
  movie.animationSpeed = 0.1;
  stage.addChild(movie);

  movie.play();
}

function moveRight() {
  var frames = [];
  var sprites = [9,10,11]

  for (var i = 0; i < sprites.length; i++) {
    frames.push(texture.fromFrame('player' + sprites[i] + '.png'));
  }
  movie = new PIXI.extras.MovieClip(frames);
  movie.animationSpeed = 0.1;
  stage.addChild(movie);

  movie.play();
}

function moveLeft() {
  var frames = [];
  var sprites = [3,4,5]

  for (var i = 0; i < sprites.length; i++) {
    frames.push(texture.fromFrame('player' + sprites[i] + '.png'));
  }
  movie = new PIXI.extras.MovieClip(frames);
  movie.animationSpeed = 0.1;
  stage.addChild(movie);

  movie.play();
}


// $(document).on('keyup', function(e) {

//   switch (e.which) {
//     case Keyboard.key.arrowDown:
//       movie.stop();
//       break;
//     case Keyboard.key.arrowUp:
//       movie.stop();
//       break;
//     case Keyboard.key.arrowRight:
//       movie.stop();
//       break;
//     case Keyboard.key.arrowLeft:
//       movie.stop();
//       break;
//     case Keyboard.key.Spacebar:
//       // ..code
//       break;
//   }

// });