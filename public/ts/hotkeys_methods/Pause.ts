/// <reference path="../hotkeys.ts"/>
/// <reference path="../socket/game.ts"/>

function keyPause() {

  return {

    pressed: function() {

      if ($('#game').hasClass('paused')) {
        socket.emit('pause', 'running');
      } else {
        socket.emit('pause', 'paused');
      }

    }

  }

}