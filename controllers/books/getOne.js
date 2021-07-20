const { bookService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getOne = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const result = await services.getOne(bookId);

    if (!result) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'fail',
        code: httpCode.BAD_REQUEST,
        message: 'Book not found',
      });
    }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      data: {
        result,
      },
    });
  } catch (error) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: 'fail',
      code: httpCode.BAD_REQUEST,
      message: 'Invalid bookId',
    });
  }
};

module.exports = getOne;
