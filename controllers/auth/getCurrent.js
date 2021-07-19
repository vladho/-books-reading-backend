const { userService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getCurrent = async (req, res, next) => {
  const { _id: userId } = req.user;

  try {
    const user = await services.getUserById(userId);

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    });
  }
};

module.exports = getCurrent;
