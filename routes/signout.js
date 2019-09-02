var express = require('express');
var router = express.Router();

var checkSignin = require('../middlewares/check').checkSignin;

router.get('/', checkSignin, function (req, res, next) {
  req.session.user = null;
  req.flash('success', 'Sign out successfully');
  res.redirect('/');
})

module.exports = router;