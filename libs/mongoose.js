var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/game');

module.exports = mongoose;