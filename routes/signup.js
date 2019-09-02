var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var UserModel = require('../models/user')
var checkNotSignin = require('../middlewares/check').checkNotSignin;

router.get('/', checkNotSignin, function(req, res, next) {
    res.render('signup');
}) 

router.post('/', checkNotSignin, function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var password2 = req.body.password2;

    try {
        if (password !== password2) {
            console.log(password+"   "+password2)
            throw new Error("Two passwords don't match");
        }
        if (password.length < 6) {
            throw new Error("Password requires at least 6 characters");
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/signup');
    }
    
    password = sha1(password);

    let user = {
        name: name,
        password: password,
    }

    UserModel.create(user).then(function (result) {
      user = result.ops[0];
      delete user.password;
      req.session.user = user;
      req.flash('success', 'Sign up successfully!');
      res.redirect('/chat');
    })
    .catch (function (e) {
        if (e.message.match('duplicate key')) {
            req.flash('error', "This user name is not available, please try another one.");
            return res.redirect('/signup');
        }
    })

}) 

module.exports = router;