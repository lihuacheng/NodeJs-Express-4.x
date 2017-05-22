var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.redirect('/home/home.ejs');
  res.render('home/home', { title: '首页' });
});

module.exports = router;
