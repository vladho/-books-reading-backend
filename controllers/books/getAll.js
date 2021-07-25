const { bookService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAll = async (req, res, next) => {
  const { query } = req;
  const { _id: userId } = req.user;

  try {
    const books = await services.getAll(userId, query);

    if (!books) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'fail',
        code: httpCode.BAD_REQUEST,
        message: 'Missing query',
      });
    }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      data: {
        books,
        // user: userId,
        // _id: books._id,
        // title: books.title,
        // author: books.author,
        // year: books.year,
        // totalPages: books.totalPages,
        // readPages: books.readPages,
        // status: books.status,
        // rating: books.rating,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
