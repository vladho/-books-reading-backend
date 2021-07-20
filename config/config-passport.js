const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt, Strategy } = require('passport-jwt');
const { userService: services } = require('../services');
const keys = require('./config-keys');
const { User } = require('../models');
require('dotenv').config();

const { JWT_SECRET_KEY } = process.env;

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

const params = {
  clientID: keys.google.googleClientId,
  clientSecret: keys.google.googleClientKey,
  callbackURL: 'http://localhost:8080/api/auth/google/redirect',
};

passport.use(
  new Strategy(settings, async (payload, done) => {
    try {
      const user = await services.getUserById(payload.id);

      if (!user) {
        return done(new Error('User not found'));
      }

      if (!user.token) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      done(new Error(error.message));
    }
  })
);

passport.use(
  new GoogleStrategy(
    params,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const newUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value.replace(/_normal/, ''),
          googleId: profile.id,
        };

        console.log('newUser:', newUser);

        User.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({
              googleId: profile.id,
            })
              // вызвать метод addUser или как то сохранить в db
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
      } catch (error) {
        done(new Error(error.message));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // user.id - id из db
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    console.log('user:', user);
    done(null, user);
  });
});

// passport.deserializeUser((id, done) => {
//   User.findById(id, (error, user) => {
//     done(error, user);
//   });
// });
