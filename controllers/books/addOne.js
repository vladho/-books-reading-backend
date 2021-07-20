const { bookService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const addOne = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { title, author, year, totalPages } = req.body;

  try {
    if (!title || !author || !year || !totalPages) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Missing or bad name of some fields',
      });
    }

    const book = await services.addOne(userId, {
      title,
      author,
      year,
      totalPages,
    });

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
