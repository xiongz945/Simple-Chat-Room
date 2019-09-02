var express = require("express");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var bodyParser = require('body-parser');

var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set('views', __dirname + '/views');
app.set('view engine', "ejs");

app.use(express.static(__dirname + '/public'));
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}));

app.use(flash());
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('succuss').toString();
    res.locals.error = req.flash('error').toString();
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

routes(app);


var ChatModel = require('./models/chat');

io.on('connection', function(socket){
    console.log("a user connected");
    socket.on('disconnect', function() {
        console.log("user disconnected");
    })
    socket.on('chat message', function(msg){
        io.emit('new message', {
            name: msg.name,
            content: msg.msg,
            timestamp: Date.now()
        });

        let chat = {
            name: msg.name,
            content: msg.msg,
            timestamp: Date.now()
        }

        ChatModel.create(chat).then(function(result) {
            console.log("Post successfully");
        })

    });
});

http.listen(config.port, function() {
    console.log("Server is running on port " + config.port);
});