const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { createAccountLimiter } = require("../../helpers/rate-limit");
const useAuth = require("../../helpers/useAuth");

router.post("/signup", express.json(), createAccountLimiter, ctrl.signup);

router.post("/login", express.json(), ctrl.login);

router.post("/logout", useAuth, ctrl.logout);

module.exports = router;
