const { bookService: services } = require('../../services');
const httpCode = require('../../helpers/constants');

const getOne = async (req, res, next) => {
  const { bookId } = req.params;
  const result = await services.getOne(bookId);
  if (!bookId) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: 'fail',
      code: httpCode.BAD_REQUEST,
      message: 'Missing /bookId',
    });
  }
  res.json({
    status: 'success',
    code: httpCode.OK,
    data: {
      result,
    },
  });
};

module.exports = getOne;
