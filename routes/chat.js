var express = require("express");
var router = express.Router();

var checkSignin = require('../middlewares/check').checkSignin;
var ChatModel = require('../models/chat');


router.get('/', checkSignin, function(req, res, next) {
    ChatModel.getAllChat().then(function (chat) {
        res.render('chat', {
            chats: chat
        })
    })
    .catch(next);
});

module.exports = router;