/// <reference path="app.ts"/>

socket.on('player id', function(id) {
  var num = id;

  if (id.length >= 4) {
    id = 0;
  }

  if (id > 3) {
    id = 0;
  }

  if (id == 1) {
    player_1.model.control = true;
  }

  if (id == 2) {
    player_2.model.control = true;
  }

  if (id == 3) {
    player_3.model.control = true;
  }
});