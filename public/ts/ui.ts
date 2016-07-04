
// One Page App

$(window).on('gamepadconnection', function(e) {
  console.log('gamepad-connected!');
});

$('aside nav a.game').addClass('active');
location.href = '#/game';
$('section').stop().fadeOut(200);
$('#game').stop().fadeIn(200);

$('aside nav a').on('click', function(e) {

  e.preventDefault();

  if (!(this.classList.contains('active'))) {
    let urlPattern = /[a-z]+$/g;
    let url = this.href.match(urlPattern);

    if (url == null)
      url = 'info'

    location.href = '#/' + url;

    $(this).addClass('active')
           .parent()
           .siblings()
           .children('a')
           .removeClass('active');

    $('section').stop().fadeOut(200);
    $('#' + url).stop().fadeIn(200);
  }

});


// Grid

$('#game #game-display').append('<div id="grid"></div>');
$('#game #game-display #grid').css({
  width: game.Display.width + 1 + 'px',
  top: $('canvas').css('margin-top'),
  left: $('canvas').css('left')
});

for (var i = 0; i < 0; i++) {
  $('#game #game-display  #grid').append('<i class="map-tile"></i>');
}


// Chat

$('#game').prepend('<div id="chat"></div>');

if ($('canvas')[0]) {
  $('#game #chat').css({height: Math.abs($('#game #game-display').offset().top / 4) + 'px' });
}

$('#game #chat').append('<h3>Chat</h3>');
$('#game #chat').append('<p>message 1</p>');
$('#game #chat').append('<p>message 2</p>');


// Asides

$('body').css({ height: $(window).innerHeight() })
$('body #main-row > .col-md-1').css({ height: $('body').innerHeight() })


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
});