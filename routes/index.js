var router = function(app) {
    
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/chat', require('./chat'));
};


module.exports = router;