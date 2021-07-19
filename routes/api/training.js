const express = require('express');
const router = express.Router();
const { training: ctrl } = require('../../controllers');
const useAuth = require('../../helpers/useAuth');

router.get('/', useAuth, ctrl.getAll);

router.get('/:trainingId', useAuth, ctrl.getOne);

router.post('/', useAuth, ctrl.addTraining);

router.put('/:trainingId', useAuth, ctrl.updateOne);

module.exports = router;
