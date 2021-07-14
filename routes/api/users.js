const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { createAccountLimiter } = require('../../helpers/rate-limit');
const useAuth = require('../../helpers/useAuth');

const { validateSignup, validateLogin } = require('../../validation/users');

router.post('/signup', createAccountLimiter, validateSignup, ctrl.signup);

router.post('/login', validateLogin, ctrl.login);

router.post('/logout', useAuth, ctrl.logout);

module.exports = router;
