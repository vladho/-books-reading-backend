const express = require('express');
const router = express.Router();
const { training: ctrl } = require('../../controllers');
const useAuth = require('../../helpers/useAuth');

router.get('/', useAuth, ctrl.getCurrent);

router.post('/', useAuth, ctrl.addOne);

module.exports = router;
