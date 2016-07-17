/// <reference path="app.ts"/>
/// <reference path="socket/socket.ts"/>

// One Page App
module ui {

  // UI

  // Lobby

    // Lists
    
    $('#lobby .players-list li a').on('click', function(e) {
      e.preventDefault();

      if (thisClientName != '') {
        if (!($('#lobby .btn.ready').hasClass('active'))) {
          if ($(this).text() == 'Пустой слот') {
              $(this).html('<i>' + thisClientName + '</i>')
                         .parent()
                         .parent()
                         .children()
                         .eq(prevSlot)
                         .children('a')
                         .text('Пустой слот');

              prevSlot = $(this).parent().index();
          }
        }
      }

    });

    $('#lobby .spectators-list li a').on('click', function(e) {
      e.preventDefault();

      // if (!($('#lobby .btn.ready').hasClass('active'))) {
      //   if ($(this).text() == 'Пустой слот') {
      //       $(this).html('<i>' + thisClientName + '</i>')
      //                  .parent()
      //                  .parent()
      //                  .children()
      //                  .eq(prevSlot)
      //                  .children('a')
      //                  .text('Пустой слот');

      //       prevSlot = $(this).parent().index();
      //   }
      // }

    });

    // Ready Button

    $('#lobby .btn.ready').on('click', function() {
      $(this).toggleClass('active');
    });

  // Lobby end

  $(window).on('gamepadconnection', function(e) {
    console.log('gamepad-connected!');
  });

  $('aside nav li.game').addClass('active');
  location.href = '#/lobby';
  $('section').stop().fadeOut(200);
  $('#lobby').stop().fadeIn(200);

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
        $('#bar').stop().animate({bottom: -$('#bar').innerHeight() }, 300);
        $('#chat').stop().animate({
          height: $('body').innerHeight()
        }, 300);
        $('#info').css({ overflowY: 'auto' });
      } else {
        $('#chat').stop().animate({
          height: $('body').innerHeight() - $('#bar').innerHeight() + 'px'
        }, 300);
        $('#bar').stop().animate({bottom: 0}, 300);
      }
    }

  });


  // Exit

  $('aside nav li.exit a').on('click', function(e) { e.preventDefault(); });


  // Grid

  $('#game #game-display').append('<div id="grid"></div>');
  $('#game #game-display #grid').css({
    width: GAME.Display.width + 'px',
    height: GAME.Display.height + 'px'
  });

  for (var i = 0; i < 289; i++) { // 5000
    $('#game #game-display  #grid').append('<i class="map-tile"></i>');
  }


  // Bar

  // var staticBombsCount = player_1.model.bombsCount;

  $('#game #bar .row').prepend('<div class="col-md-9"></div>')
  $('#game #bar .col-md-9').append('<span class="hp">hp: <b>100 / 100</b></span>');
  // $('#game #bar .col-md-9').append('<span class="bombs">bombs: <b>'+staticBombsCount+' / '+staticBombsCount+'</b></span>');


  // Asides

  $('body').css({ height: $(window).innerHeight() })
  $('body #main-row > .col-md-1:first-child').css({ height: $('body').innerHeight() })


  // Chat

  $('#chat').css({
    height: $('body').innerHeight() + 'px'
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

}