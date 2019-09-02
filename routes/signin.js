var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var UserModel = require('../models/user');
var checkNotSignin = require('../middlewares/check').checkNotSignin;

router.get('/', checkNotSignin, function(req, res, next) {
    res.render("signin");
});


router.post('/', checkNotSignin, function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;

    try {
        if (!name.length) {
          throw new Error('Please input your name');
        }
        if (!password.length) {
          throw new Error('Please input your password');
        }
      } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
      }

    UserModel.getUserByName(name)
    .then(function (user) {
      if (!user) {
        req.flash('error', 'User doesn\'t exist!');
        return res.redirect('back')
      }
      
      if (sha1(password) !== user.password) {
        req.flash('error', 'Wrong name or password');
        return res.redirect('back');
      }
      req.flash('success', 'Sign in successfully!');
      delete user.password;
      req.session.user = user;
      res.redirect('/chat');
    })
    .catch(next); 
});

module.exports = router;