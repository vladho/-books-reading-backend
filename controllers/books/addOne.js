const { bookService: services } = require('../../services');
const httpCode = require('../../helpers/constants');

const addOne = async (req, res, next) => {
  const { name, author, year, pages } = req.body;
  try {
    const result = await services.addOne({ name, author, year, pages });
    if (!name || !author || !year || !pages) {
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
      data: { result },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = addOne;
