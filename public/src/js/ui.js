$(document).ready(function() {

  'use strict';

  var gamePadId = navigator.getGamepads()[0].id;
  // console.log(navigator.getGamepads()[0]);

  window.addEventListener('gamepadconnected', function(e) {
    
    console.log('Gamepad-1 connected!');
    $('body #message').remove();
    $('body').append('<div id="message"></div>');
    $('body #message').append('<h3>' + gamePadId + ' (Gamepad-1)</h3>');
    $('body #message h3').css({color: 'green'});
    $('body #message').append('<p>Для настройки устройства перейдите в настройки</p>');
    $('body #message').animate({ right: -$('body #message').innerWidth() }, 0);
    $('body #message').animate({ opacity: 1, right: 0 });

    setTimeout(function() {
      $('body #message').animate({ opacity: 0, right: -$('body #message').innerWidth() }, function() {
        $('body #message').remove();
      });
    }, 5000);
  });

  window.addEventListener('gamepaddisconnected', function(e) {
    console.log('Gamepad-1 disconnected!');
    $('body #message').remove();
    $('body').append('<div id="message"></div>');
    $('body #message').append('<h3>' + gamePadId + ' (Gamepad-1)</h3>');
    $('body #message h3').css({color: 'red'});
    $('body #message').append('<p>Для дополнительной информации перейдите в настройки</p>');
    $('body #message').animate({ right: -$('body #message').innerWidth() }, 0);
    $('body #message').animate({ opacity: 1, right: 0 });

    setTimeout(function() {
      $('body #message').animate({ opacity: 0, right: -$('body #message').innerWidth() }, function() {
        $('body #message').remove();
      });
    }, 5000);
  });

});