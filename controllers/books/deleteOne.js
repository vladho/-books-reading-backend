const { httpCode } = require('../../helpers/constants');
const { bookService: services } = require('../../services');

const deleteOne = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { bookId } = req.params;
  const { _id: trainingId } = req.user.training;

  try {
    const book = await services.getOne(bookId);

    if (!book) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'fail',
        code: httpCode.BAD_REQUEST,
        message: 'Book not found',
      });
    }

    await services.deleteOne(userId, bookId, trainingId);

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Book deleted',
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = deleteOne;
