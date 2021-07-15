const express = require('express');
const router = express.Router();
const { books: ctrl } = require('../../controllers');
const useAuth = require('../../helpers/useAuth');

router.get('/', ctrl.getAll);

router.get('/:bookId', ctrl.getOne);

router.post('/', useAuth, ctrl.addOne);

router.post('/:bookId', useAuth, ctrl.deleteOne);

module.exports = router;
