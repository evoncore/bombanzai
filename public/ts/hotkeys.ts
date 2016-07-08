/// <reference path="app.ts"/>
/// <reference path="classes/Controls.ts"/>
/// <reference path="hotkeys_methods/ArrowDown.ts"/>
/// <reference path="hotkeys_methods/ArrowUp.ts"/>
/// <reference path="hotkeys_methods/ArrowRight.ts"/>
/// <reference path="hotkeys_methods/ArrowLeft.ts"/>
/// <reference path="hotkeys_methods/Spacebar.ts"/>

  const CONTROLS = new Controls;
  var bomb;
  let two_keys = false;

  player_1.camera.x += player_1.model.position.x;
  player_1.camera.y += player_1.model.position.y 
  $('canvas').css({ 
                    marginLeft: -player_1.camera.x + 'px', 
                    marginTop: -player_1.camera.y + 'px'
                  });

  $(document).on('keydown', function(e) {

    // Disable all default key-events
    // if (e.stopPropagation) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }

    switch (e.which) {
      case CONTROLS.Keyboard.key.arrowDown.val:
          ////
          if (!two_keys) {
            CONTROLS.Keyboard.key.arrowDown.action();
          }
          ////
        break;
      case CONTROLS.Keyboard.key.arrowUp.val:
          ////
          if (!two_keys) {
            CONTROLS.Keyboard.key.arrowUp.action();
          }
          ////
        break;
      case CONTROLS.Keyboard.key.arrowRight.val:
          ////
          if (!two_keys) {
            CONTROLS.Keyboard.key.arrowRight.action();
          }
          ////
        break;
      case CONTROLS.Keyboard.key.arrowLeft.val:
          ////
          if (!two_keys) {
            CONTROLS.Keyboard.key.arrowLeft.action();
          }
          ////
        break;
      case CONTROLS.Keyboard.key.Spacebar.val:
          ////
          CONTROLS.Keyboard.key.Spacebar.action();
          ////
        break;
    }

  });


  // Top Left

  // twoKeysDown(
  //   function() {
  //     CONTROLS.Keyboard.key.arrowUp.action();
  //     CONTROLS.Keyboard.key.arrowLeft.action();
  //   },
  //   CONTROLS.Keyboard.key.arrowUp.val,
  //   CONTROLS.Keyboard.key.arrowLeft.val
  // );

  // // Top Right

  // twoKeysDown(
  //   function() {
  //     CONTROLS.Keyboard.key.arrowUp.action();
  //     CONTROLS.Keyboard.key.arrowRight.action();
  //   },
  //   CONTROLS.Keyboard.key.arrowUp.val,
  //   CONTROLS.Keyboard.key.arrowRight.val
  // );

  // // Bottom Left

  // twoKeysDown(
  //   function() {
  //     CONTROLS.Keyboard.key.arrowDown.action();
  //     CONTROLS.Keyboard.key.arrowLeft.action();
  //   },
  //   CONTROLS.Keyboard.key.arrowDown.val,
  //   CONTROLS.Keyboard.key.arrowLeft.val
  // );

  // // Bottom Right

  // twoKeysDown(
  //   function() {
  //     CONTROLS.Keyboard.key.arrowDown.action();
  //     CONTROLS.Keyboard.key.arrowRight.action();
  //   },
  //   CONTROLS.Keyboard.key.arrowRight.val,
  //   CONTROLS.Keyboard.key.arrowDown.val
  // );

  // function twoKeysDown(func, key1, key2) {
  //   var codes = [].slice.call(arguments, 1);
  //   var pressed = {};

  //   $(document).on('keydown', function(e) {

  //     pressed[e.keyCode] = true;
  //     two_keys = true;

  //     for (var i = 0; i < codes.length; i++) {
  //       if (!pressed[codes[i]]) {
  //         return;
  //       }
  //     }

  //     // only one click
  //     // pressed = {};
  //     func();

  //   });

  //   $(document).on('keyup', function(e) {
  //     two_keys = false;
  //     delete pressed[e.keyCode];
  //   });

  // }