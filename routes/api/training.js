const express = require('express');
const router = express.Router();
const { training: ctrl } = require('../../controllers');
const useAuth = require('../../helpers/useAuth');

router.get('/', useAuth, ctrl.getCurrent);

router.get('/:trainingId', useAuth, ctrl.getOne);

router.post('/', useAuth, ctrl.addOne);

router.put('/:trainingId', useAuth, ctrl.updateOne);

module.exports = router;
