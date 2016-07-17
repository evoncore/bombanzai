
// Game UI

function gameContinue() {
  if ($('#game').hasClass('paused')) {
    $('#game .shadow').remove();
    $('#game').removeClass('paused');
  }
}

function gamePaused() {
  if ($('#game').hasClass('paused') && $('#game').children('.shadow').length == 0) {
    $('#game').append('<div class="shadow"></div>');
    $('#game .shadow').append('<p class="message">Game is Paused</p>');
  }
}