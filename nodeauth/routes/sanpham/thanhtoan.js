var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sanpham/thanhtoan', { title: 'shopNAMMAI' });
});

module.exports = router;