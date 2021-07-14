const express = require('express');
const router = express.Router();
const { books: ctrl } = require('../../controllers');

router.get('/', ctrl.getAll);
router.get('/:bookId', ctrl.getOne);
router.post('/', ctrl.addOne);

module.exports = router;
