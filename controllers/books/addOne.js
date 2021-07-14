const { bookService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const addOne = async (req, res, next) => {
  const { title, author, year, totalPages } = req.body;

  try {
    const book = await services.addOne({ title, author, year, totalPages });

    if (!title || !author || !year || !totalPages) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Missing some fields',
      });
    }

    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Book added',
      data: {
        book,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = addOne;
