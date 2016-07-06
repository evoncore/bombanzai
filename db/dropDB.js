var mongoose = require('../libs/mongoose');
var db = mongoose.connection.db;
db.dropDatabase();
mongoose.disconnect();