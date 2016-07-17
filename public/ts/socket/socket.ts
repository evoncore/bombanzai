

var socket = io('', {
  reconnection: true,
  'reconnectionDelay': 1,
  'reconnectionAttempts': 60 
});


var ul = $('#chat ul');
var form = $('#chat form');
var connectedList = $('#lobby .connected ul');
var prevSlot;
var client = { id: null, name: null };