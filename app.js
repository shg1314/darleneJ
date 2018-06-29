var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var bodyParser = require('body-parser');
var session    = require('express-session');
// Import Passport and Warning flash modules
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// Database configuration
var config = require('./config/config.js');
// connect to our database
//mongoose.connect(config.sesiondb.url);
// Check if MongoDB is running
//mongoose.connection.on('error', function() {
//	console.error('MongoDB Connection Error. Make sure MongoDB is running.');
//});

// Passport configuration
//require('./config/passport')(passport);


app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
// required for passport
// secret for session
app.use(session({
  secret: 'sometextgohere',
  saveUninitialized: true,
  resave: true,
  //store session on MongoDB using express-session + connect mongo
  store: new MongoStore({
      url: config.sesiondb.url,
      collection : 'sessions'
  })
}));

// flash messages
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/login',function(req,res,next){
  res.render('login', {title : 'login page', message : req.flash('loginMessage')});
}
);

var userController = require('./controllers/userController');
app.post('/login', userController.login);


// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
