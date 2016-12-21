var express = require('express');
var router = express.Router();

var user = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next) {
  res.render('add',{
    'title': 'add'
  });
});



router.get('/list', function(req, res, next) {
  res.render('list',{
    'title': 'list'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login',{
    'title': 'ĐĂNG NHẬP'
  });
});

router.post('/register',function(req, res, next){
  //get form values
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  //form validation
  req.checkBody('name','Name field is require').notEmpty();
  req.checkBody('email','Email field is require').notEmpty();
  req.checkBody('email','Email not vaild').isEmail();
  req.checkBody('username','Username field is require').notEmpty();
  req.checkBody('password','Password field is require').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  //check for errors
  var errors = req.validationErrors();

  if(errors){
    res.render('Register',{
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    //create user
    User.createUser(newUser,function(err, user) {
      if(err) throw err ;
       console(user)  ;
      
     
     // console.log(user);
    });

    //success message
    req.flash('success','Bạn đã đăng ký thành công và hãy đăng nhập');

    res.location('/');
    res.redirect('/');
  }
});

module.exports = router;


