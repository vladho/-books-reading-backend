const { httpCode } = require('../../helpers/constants');
const { bookService: services } = require('../../services');

const deleteOne = async (req, res, next) => {
  const { _id: userId } = req.user;
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
    await services.deleteOne(userId, bookId);
    res.status(httpCode.OK).json({
      status: 'success',
      code: 204,
      message: 'Book deleted',
    });
  } catch (error) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: 'fail',
      code: httpCode.BAD_REQUEST,
      message: 'Invalid bookId',
    });
  }
};

module.exports = deleteOne;
