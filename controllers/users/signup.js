const { userService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await services.getUserByEmail(email);

    if (user) {
      return res.status(httpCode.CONFLICT).json({
        status: 'error',
        code: httpCode.CONFLICT,
        message: 'Email in use',
      });
    }

    if (!email || !password) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Missing required fields',
      });
    }

    const newUser = await services.addUser({ name, email, password });

    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Successfully added',
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updateAt: newUser.updateAt,
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = signup;
