const express = require('express');
const router = express.Router();
const { books: ctrl } = require('../../controllers');
const useAuth = require('../../helpers/useAuth');

router.get('/', ctrl.getAll);

router.get('/:bookId', ctrl.getOne);

router.post('/', express.json(), useAuth, ctrl.addOne);

module.exports = router;
