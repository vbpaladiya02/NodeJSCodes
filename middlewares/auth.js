const passport = require('passport');

function authentication(req, res, next) {
    if (req.user) {
        return next()
    }
    return passport.authenticate("jwt", {
        session: false
    }, async (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return util.unAuthenticated(res);
        }
        req.userId = user._id;
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = {
    authentication
};
