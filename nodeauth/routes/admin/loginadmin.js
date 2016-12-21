var express = require('express');
var router = express.Router();

/* GET home admin page. */
router.get('/', function(req, res, next) {
  res.render('admin/loginadmin', { title: 'shopNAMMAI' });
});


module.exports = router;

