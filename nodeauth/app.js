var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var modlter = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;



var routes = require('./routes/index');
var users = require('./routes/users');
//var admin = require('./routes/admin');
var shop = require('./routes/shop');
var thongtinshop = require('./routes/thongtinshop');
var lienhe = require('./routes/lienhe');
var thanhtoan = require('./routes/sanpham/thanhtoan');
var checkout = require('./routes/sanpham/checkout');
var login = require('./routes/sanpham/login');
var laptop = require('./routes/sanpham/laptop');
var loginadmin = require('./routes/admin/loginadmin');
var add = require('./routes/admin/add');
//var notes = require('./routes/notes');

//var models = require('./models-sqlite3/notes');
//var models = require('./models-mongoose/notes');
//models.connect("mongodb://localhost/notes", function(err) {
 //   if(err)
  //  throw err;
//});
//notes.configure(models);
//routes.configure(models);




var app = express();
var multer  = require('multer');
var upload = multer();

//mongoose.connect('mongodb://localhost:27017/nodeauth');
//mongoose.connect('mongodb://localhost/nodeauth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//var sanpham = require('sanpham');
//sanpham(app);
//app.listen(port);

//handler file uploads
app.use(multer({dest:'./uploads/'}).single('photo'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//handler express session
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave:true
}));

// passport


app.use(passport.initialize());
app.use(passport.session());

//validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', routes);
app.use('/users', users);
//app.use('/admin', admin);
app.use('/shop', shop);
app.use('/thongtinshop', thongtinshop);
app.use('/lienhe', lienhe);
app.use('/sanpham/thanhtoan', thanhtoan);
app.use('/sanpham/checkout', checkout);
app.use('/sanpham/login', login);
app.use('/sanpham/laptop', laptop);
app.use('/loginadmin', loginadmin);
app.use('/admin/add', add);
//app.use('/checkout', checkout);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//production error handler
// no stacktrace leaked to users
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
