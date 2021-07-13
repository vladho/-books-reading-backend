const passport = require("passport");
const httpCode = require("../helpers/constants");

const useAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (!user || error) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: "error",
        code: httpCode.UNAUTHORIZED,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = useAuth;
