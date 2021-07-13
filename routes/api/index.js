const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { createAccountLimiter } = require('../../helpers/rate-limit');

router.post('/signup', createAccountLimiter, ctrl.signup);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);

module.exports = router;
