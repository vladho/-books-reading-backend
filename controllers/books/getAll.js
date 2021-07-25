const { bookService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAll = async (req, res, next) => {
  // const { query } = req;
  const { _id: userId } = req.user;

  try {
    // const books = await services.getAll(userId, query);
    const books = await services.getAll(userId);

    if (!books) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'fail',
        code: httpCode.NOT_FOUND,
        message: 'Not found',
      });
    }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Successful operation',
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
    throw new Error(error.message);
  }
};

module.exports = getAll;
