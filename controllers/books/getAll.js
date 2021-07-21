const { bookService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAll = async (req, res, next) => {
  const { query } = req;
  const { _id: userId } = req.user;

  try {
    const result = await services.getAll(userId, query);

    if (!result) {
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
        result,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAll;
