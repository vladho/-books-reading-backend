const { bookService: services } = require('../../services');
const httpCode = require('../../helpers/constants');

const getAll = async (req, res, next) => {
  const { query } = req;
  console.log(query);
  const result = await services.getAll(query);
  //   if (!query) {
  //     return res.status(httpCode.BAD_REQUEST).json({
  //       status: 'fail',
  //       code: httpCode.BAD_REQUEST,
  //       message: 'Missing query',
  //     });
  //   }
  res.json({
    status: 'success',
    code: httpCode.OK,
    data: result,
  });
};

module.exports = getAll;
