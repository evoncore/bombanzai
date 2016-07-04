var Game, gl;

Game = {
  canvas: null,
  Display: {
    width: 960,
    height: 448
  }
}

// Create Canvas

$('#game').append('<canvas id="game-display"></canvas>');


// Init Canvas

Game.canvas = document.querySelector('#game-display');

// Start

function start() {

  gl = initWebGL(Game.canvas);

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  }

  gl.viewport(0, 0, Game.Display.width, Game.Display.height);

}

// Init WebGL

function initWebGL(canvas) {
  gl = null;

  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch(e) {}

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser may not support it.');
    gl = null;
  }

  return gl;
}

function initShaders() {
  var fragmentShader = getShader(gl, 'shader-fs');
  var vertexShader = getShader(gl, 'shader-vs');

  // Create Shader Program

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program.');
  }

  gl.useProgram(shaderProgram);

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(vertexPositionAttribute);
}