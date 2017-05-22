var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var ejs = require('ejs');

var session = require('express-session');

//mysql  数据库
var mysql = require('mysql');
//log4js 日志
var log4js = require('log4js');
var app = express();

log4js.configure('my_log4js_configuration.json',{});//加载log4j配置文件
var logger = log4js.getLogger('nomel');
logger.setLevel('INFO');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(log4js.connectLogger(logger,{level:'auto',format:':method:url'}));

app.use(session({
  secret:'recommand 128 bytes random string',
  cookie:{maxAge:60*1000},
  resave:false,
  saveUninitialized:true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
exports.logger = function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
}

module.exports = app;
