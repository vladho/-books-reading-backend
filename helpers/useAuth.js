const passport = require('passport');
const { httpCode } = require('../helpers/constants');
require('../config/config-passport');

const useAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const [, token] = req.get('Authorization').split(' ');
    if (!user || error || token !== user.token) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: 'error',
        code: httpCode.UNAUTHORIZED,
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
    // return next()
  })(req, res, next);
};

module.exports = useAuth;
