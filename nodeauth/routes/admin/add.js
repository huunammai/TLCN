var express = require('express');
var router = express.Router();


/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('admin/add', { title: 'shopNAMMAI' });
});


module.exports = router;

