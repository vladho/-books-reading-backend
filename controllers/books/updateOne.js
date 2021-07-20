const { bookService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const updateOne = async (req, res, next) => {
  const userId = req.user.id;
  const { bookId: id } = req.params;
  const { rating, resume } = req.body;

  console.log('user:', req.user);
  console.log('id:', id);
  console.log('body:', req.body);
  console.log('req.params:', req.params);

  try {
    const book = await services.updateOne(userId, id, rating, resume);

    if (!book || !id) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'error',
        code: httpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    if (book.readPages !== book.totalPages && book.status === 'done') {
      return res.status(httpCode.FORBIDDEN).json({
        status: 'error',
        code: httpCode.FORBIDDEN,
        message: 'The book has not been read yet',
      });
    }

    if (!rating || !resume) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'error',
        code: httpCode.NOT_FOUND,
        message: 'Missing field',
      });
    }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Resume added',
      data: {
        book,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updateOne;
