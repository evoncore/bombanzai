/// <reference path="app.ts"/>
/// <reference path="classes/Controls.ts"/>
/// <reference path="hotkeys_methods/ArrowDown.ts"/>
/// <reference path="hotkeys_methods/ArrowUp.ts"/>
/// <reference path="hotkeys_methods/ArrowRight.ts"/>
/// <reference path="hotkeys_methods/ArrowLeft.ts"/>
/// <reference path="hotkeys_methods/Spacebar.ts"/>
/// <reference path="hotkeys_methods/Pause.ts"/>

const CONTROLS = new Controls;
var bomb;

if (GAME.Display.scroll) {
  player_1.camera.x += player_1.model.position.x;
  player_1.camera.y += player_1.model.position.y;
  $('canvas').css({ marginLeft: -player_1.camera.x + 'px', 
                    marginTop: -player_1.camera.y + 'px' });
}

$(document).on('keydown', function(e) {

  if (GAME.status == 'running') {

    // Disable all default key-events
    // if (e.stopPropagation) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }

    switch (e.which) {
      case CONTROLS.Keyboard.key.arrowDown.val:
          ////
          CONTROLS.Keyboard.key.arrowDown.action();
          ////
        break;
      case CONTROLS.Keyboard.key.arrowUp.val:
          ////
          CONTROLS.Keyboard.key.arrowUp.action();
          ////
        break;
      case CONTROLS.Keyboard.key.arrowRight.val:
          ////
          CONTROLS.Keyboard.key.arrowRight.action();
          ////
        break;
      case CONTROLS.Keyboard.key.arrowLeft.val:
          ////
          CONTROLS.Keyboard.key.arrowLeft.action();
          ////
        break;
      case CONTROLS.Keyboard.key.Spacebar.val:
          ////
          CONTROLS.Keyboard.key.Spacebar.action();
          ////
        break;

      // Pause
      case CONTROLS.Keyboard.key.Pause.val:
          ////
          CONTROLS.Keyboard.key.Pause.action();
          ////
        break;
    }
  }

  if (GAME.status == 'paused') {
    switch (e.which) {
      case CONTROLS.Keyboard.key.Pause.val:
          ////
          CONTROLS.Keyboard.key.Pause.action();
          ////
        break;
    }
  }

});