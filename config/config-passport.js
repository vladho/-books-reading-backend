const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
require('dotenv').config();

const { userService: services } = require('../services');

const { JWT_SECRET_KEY } = process.env;

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

passport.use(
  new Strategy(settings, async (payload, done) => {
    try {
      const user = await services.getUserById(payload.id);
      if (!user) {
        return done(new Error('User not found'));
      }
      if (!user.token) {
        console.log(user.token);
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(new Error(error.message));
    }
  })
);
