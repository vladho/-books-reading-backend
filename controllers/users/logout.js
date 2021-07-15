const { userService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const logout = async (req, res, next) => {
  const userId = req.user._id;

  console.log('user:', userId);
  try {
    await services.updateToken(userId, null);
    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.NO_CONTENT,
      message: 'Success logout',
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = logout;
