const passport = require('passport');
const passportJwt = require('passport-jwt');
require('dotenv').config();

const { userService: services } = require('../services');

const { ExtractJwt, Strategy } = passportJwt;
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
        throw new Error('User not found');
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
