const express = require('express');
const router = express.Router();
const { training: ctrl } = require('../../controllers');

router.post('/', ctrl.addTraining);

module.exports = router;
