const express = require('express');
const router = express.Router();
const { training: ctrl } = require('../../controllers');
const useAuth = require('../../helpers/useAuth');

router.post('/', useAuth, ctrl.addTraining);

module.exports = router;
