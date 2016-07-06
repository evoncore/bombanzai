/// <reference path="app.ts"/>

// One Page App

$(window).on('gamepadconnection', function(e) {
  console.log('gamepad-connected!');
});

$('aside nav li.game').addClass('active');
location.href = '#/game';
$('section').stop().fadeOut(200);
$('#game').stop().fadeIn(200);

$('aside nav a').on('click', function(e) {

  e.preventDefault();

  if (!(this.classList.contains('active')) && !(this.classList.contains('exit'))) {
    let urlPattern = /[a-z]+$/g;
    let url = this.href.match(urlPattern);

    if (url == null)
      url = 'info'

    location.href = '#/' + url;

    $(this).parent()
           .addClass('active')
           .siblings()
           .removeClass('active');

    $('section').stop().fadeOut(200);
    $('#' + url).stop().fadeIn(200);

    if (url != 'game') {
      $('#bar').stop().animate({opacity: 0}, 0);
      $('#chat').stop().animate({
        height: $('body').innerHeight()
      }, 300);
    } else {
      $('#chat').stop().animate({
        height: $('#game #game-display').height()
      }, 300, function() {
        $('#bar').stop().animate({opacity: 1}, 300);
      });
    }
  }

});

// Exit Button

$('aside nav li.exit a').on('click', function(e) {
  e.preventDefault();

  $.ajax({
    url: '/',
    method: 'POST',
    data: 'exit-app',
    complete: function() {
      console.log('exiting...');
    },
    statusCode: {
      200: function() {
         console.log('done!');
      },
      403: function(jqXHR) {
        var error = JSON.parse(jqXHR.responseText);
        $('.error', form).html(error.message);
      }
    }
  });

  return false;
});


// Grid

$('#game #game-display').append('<div id="grid"></div>');
$('#game #game-display #grid').css({
  width: game.Display.width + 'px',
  top: 0,
  left: $('canvas').css('left')
});

for (var i = 0; i < 0; i++) { // 5000
  $('#game #game-display  #grid').append('<i class="map-tile"></i>');
}


// Bar

$('#game').append('<div id="bar"></div>');

$('#game #bar').append('<span>hp: <b>100 / 100</b></span>');
$('#game #bar').append('<span>bombs: <b>∞ / ∞</b></span>');


// Asides

$('body').css({ height: $(window).innerHeight() })
$('body #main-row > .col-md-1:first-child').css({ height: $('body').innerHeight() })


// Chat

$('#chat').css({
  height: $('#game #game-display').height()
});


// Errors

if ($(window).innerWidth() <= 1199) {
  $('body').css({backgroundColor: '#fff'});
  $('body > *').css({display: 'none'});
  $('body').append('<div id="error9001"><img src="../img/errors/9001.gif" alt=":(" />Ваше устройство временно не поддерживается</div>')
} else {
  $('body #error9001').remove();
  $('body').css({backgroundColor: '#222'});
  $('body > *').css({display: 'block'});
}

$(window).on('resize', function() {
  if ($(window).innerWidth() <= 1199) {
    $('body').css({backgroundColor: '#fff'});
    $('body > *').css({display: 'none'});
    $('body').append('<div id="error9001"><img src="../img/errors/9001.gif" alt=":(" />Ваше устройство временно не поддерживается</div>')
  } else {
    $('body #error9001').remove();
    $('body').css({backgroundColor: '#222'});
    $('body > *').css({display: 'block'});
  }

  $('body').css({ height: $(window).innerHeight() })
  $('body #main-row > .col-md-1:first-child').css({ height: $('body').innerHeight() })
});

$(document).ready(function() {
  $('body').addClass('show-body');
});