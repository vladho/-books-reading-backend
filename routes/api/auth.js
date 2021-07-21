const express = require('express');
const passport = require('passport');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const { createAccountLimiter } = require('../../helpers/rate-limit');
const useAuth = require('../../helpers/useAuth');
const { validateRegister, validateLogin } = require('../../validation/auth');

router.post('/register', createAccountLimiter, validateRegister, ctrl.register);

router.post('/login', validateLogin, ctrl.login);

router.post('/logout', useAuth, ctrl.logout);

router.get('/current', useAuth, ctrl.getCurrent);

router.put('/:userId', useAuth, ctrl.updateUser);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send(req.user);
  res.send('You reached the redirect URI');
  // res.redirect('http://localhost:8080/api/training');
  // res.redirect('/register');
});

router.get('/logout', (req, res) => {
  // req.session = null;
  req.logout();
  res.send(req.user);
  // res.redirect('/register');
});

module.exports = router;
