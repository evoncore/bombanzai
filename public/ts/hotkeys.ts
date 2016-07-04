/// <reference path="app.ts"/>
/// <reference path="classes/Controls.ts"/>
/// <reference path="hotkeys_methods/ArrowDown.ts"/>
/// <reference path="hotkeys_methods/ArrowUp.ts"/>
/// <reference path="hotkeys_methods/ArrowRight.ts"/>
/// <reference path="hotkeys_methods/ArrowLeft.ts"/>
/// <reference path="hotkeys_methods/Spacebar.ts"/>

var controls = new Controls;
var bomb;

$('canvas').css({ marginLeft: -player_1.camera.x + 'px' });
$('canvas').css({ marginTop: -player_1.camera.y + 'px' });

$(document).on('keydown', function(e) {

  // if (e.stopPropagation) {
  //   e.stopPropagation();
  //   e.preventDefault();
  // }

  switch (e.which) {
    case controls.Keyboard.key.arrowDown.val:
        ////
        controls.Keyboard.key.arrowDown.action();
        ////
      break;
    case controls.Keyboard.key.arrowUp.val:
        ////
        controls.Keyboard.key.arrowUp.action();
        ////
      break;
    case controls.Keyboard.key.arrowRight.val:
        ////
        controls.Keyboard.key.arrowRight.action();
        ////
      break;
    case controls.Keyboard.key.arrowLeft.val:
        ////
        controls.Keyboard.key.arrowLeft.action();
        ////
      break;
    case controls.Keyboard.key.Spacebar.val:
        ////
        controls.Keyboard.key.Spacebar.action();
        ////
      break;
  }

});