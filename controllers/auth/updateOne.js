const { userService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const update = async (req, res, next) => {
  const { userId } = req.params;
  const { body } = req;

  try {
    const result = await services.updateOne(userId, body);

    if (!result) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'fail',
        code: httpCode.BAD_REQUEST,
        message: 'Missing Id',
      });
    }

    res.status(httpCode.OK).json({
      status: 'User updated',
      code: httpCode.OK,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
