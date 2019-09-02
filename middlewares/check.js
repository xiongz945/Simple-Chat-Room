module.exports = {
    checkSignin: function checkSignin (req, res, next) {
        if (!req.session.user) {
            req.flash('error', 'You are not signed in yet');
            return res.redirect('/signin');
        }
        next();
    },

    checkNotSignin: function checkNotSignin (req, res, next) {
        if (req.session.user) {
            req.flash('error', 'You are already signed in');
            return res.redirect('/chat');
        }
        next();
    }
}