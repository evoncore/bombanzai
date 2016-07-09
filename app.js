var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('./libs/mongoose');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);

// routes
var index = require('./routes/index');
// var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/src', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/src')));

app.use('/', index);

// app.use(session({
//   secret: 'KillerIsJim',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: false,
//     maxAge: null
//   },
//   store: new MongoStore({mongooseConnection: mongoose.connection})
// }));

// app.get('/login', require('./routes/login').get);
// app.post('/login', require('./routes/login').post);

// app.use(function(req, res, next) {
//   req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
//   console.log('visits: ' + req.session.numberOfVisits);
//   res.session.name;
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
