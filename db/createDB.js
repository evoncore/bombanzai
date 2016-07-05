var async = require('async');
var mongoose = require('../libs/mongoose');

// 1. drop database
// 2. create & save 3 users
// 3. close connection

async.series([
  open,
  dropDatabase,
  requireModels,
  createUsers
], function(err, results) {
  console.log(arguments);
  mongoose.disconnect();
  process.exit(err ? 255 : 0);
});


function open(callback) {
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function requireModels(callback) {
  require('../models/user').User;

  async.each(Object.keys(mongoose.models), function(modelName, callback) {
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createUsers(callback) {
  var users = [
    {username: 'v1', password: '123'},
    {username: 'v2', password: '345'},
    {username: 'v3', password: '678'}
  ];

  async.each(users, function(userData, callback) {
    var user = new mongoose.models.User(userData);
    user.save(callback);
  }, callback);
}

function close(callback) {
  mongoose.disconnect(callback);
}