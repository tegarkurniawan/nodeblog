var express = require('express');
var session  = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var multer  = require('multer')
var connection = require('express-myconnection');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');

var app = express();

//port
app.set('port', 8080);

//multer configuration
//destination path
//n
//rename file
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});
var upload = multer({ storage: storage })


//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



//setting database 
require('./config/database.js')(app, connection, mysql);

//authentication
require('./config/passport')(passport); // pass passport for configuration
// required for passport
app.use(session({
  secret: 'nodeblog',
  resave: true,
  saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//route
require('./app/http/routes.js')(app, upload, passport);

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'));
console.log('Express server listening on port '+ app.get('port'));

