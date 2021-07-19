const { userService: services } = require('../../services');

const getCurrent = async (req, res) => {
  const { _id: userId } = req.user;
  try {
    const user = await services.getUserById(userId);
    res.json({
      status: 'success',
      code: 200,
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
