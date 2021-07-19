const { userService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const update = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = await services.updateOne(userId, req.body);
    if (!userId) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'fail',
        code: httpCode.BAD_REQUEST,
        message: 'Missing Id',
      });
    }
    res.json({
      status: 'User updated',
      code: httpCode.OK,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
