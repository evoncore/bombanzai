/// <reference path="app.ts"/>
/// <reference path="classes/Controls.ts"/>
/// <reference path="hotkeys_methods/ArrowDown.ts"/>
/// <reference path="hotkeys_methods/ArrowUp.ts"/>
/// <reference path="hotkeys_methods/ArrowRight.ts"/>
/// <reference path="hotkeys_methods/ArrowLeft.ts"/>
/// <reference path="hotkeys_methods/Spacebar.ts"/>

var controls = new Controls;
var bomb;

player_1.camera.x += plm_1.position.x;
player_1.camera.y += plm_1.position.y 
$('canvas').css({ marginLeft: -player_1.camera.x + 'px' });
$('canvas').css({ marginTop: -player_1.camera.y + 'px' });

$(document).on('keydown', function(e) {

  // Disable all default key-events
  if (e.stopPropagation) {
    e.stopPropagation();
    e.preventDefault();
  }

  switch (e.which) {
    case controls.Keyboard.key.arrowDown.val:
        ////
        // if (!two_keys) {
          controls.Keyboard.key.arrowDown.action();
        // }
        ////
      break;
    case controls.Keyboard.key.arrowUp.val:
        ////
        // if (!two_keys) {
          controls.Keyboard.key.arrowUp.action();
        // }
        ////
      break;
    case controls.Keyboard.key.arrowRight.val:
        ////
        // if (!two_keys) {
          controls.Keyboard.key.arrowRight.action();
        // }
        ////
      break;
    case controls.Keyboard.key.arrowLeft.val:
        ////
        // if (!two_keys) {
          controls.Keyboard.key.arrowLeft.action();
        // }
        ////
      break;
    case controls.Keyboard.key.Spacebar.val:
        ////
        controls.Keyboard.key.Spacebar.action();
        ////
      break;
  }

});



// // Top Left

// twoKeysDown(
//   function() {
//     controls.Keyboard.key.arrowUp.action();
//     controls.Keyboard.key.arrowLeft.action();
//   },
//   controls.Keyboard.key.arrowUp.val,
//   controls.Keyboard.key.arrowLeft.val
// );

// // Top Right

// twoKeysDown(
//   function() {
//     controls.Keyboard.key.arrowUp.action();
//     controls.Keyboard.key.arrowRight.action();
//   },
//   controls.Keyboard.key.arrowUp.val,
//   controls.Keyboard.key.arrowRight.val
// );

// // Bottom Left

// twoKeysDown(
//   function() {
//     controls.Keyboard.key.arrowDown.action();
//     controls.Keyboard.key.arrowLeft.action();
//   },
//   controls.Keyboard.key.arrowDown.val,
//   controls.Keyboard.key.arrowLeft.val
// );

// // Bottom Right

// twoKeysDown(
//   function() {
//     controls.Keyboard.key.arrowDown.action();
//     controls.Keyboard.key.arrowRight.action();
//   },
//   controls.Keyboard.key.arrowRight.val,
//   controls.Keyboard.key.arrowDown.val
// );

function twoKeysDown(func, key1, key2) {
  var codes = [].slice.call(arguments, 1);

  var pressed = {};

  $(document).on('keydown', function(e) {

    pressed[e.keyCode] = true;

      for (var i = 0; i < codes.length; i++) {
        if (!pressed[codes[i]]) {
          return;
        }
      }

    // if want one click
    // pressed = {};
    func();

  });

  $(document).on('keyup', function(e) {
    delete pressed[e.keyCode];
  });

}