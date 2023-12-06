function loggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('notify', 'you have to login first')
    return res.redirect('/login')
}
module.exports = loggedin