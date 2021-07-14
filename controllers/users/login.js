const jwt = require('jsonwebtoken');
const { userService: services } = require('../../services');
const httpCode = require('../../helpers/constants');
require('dotenv').config();

const { JWT_SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await services.getUserByEmail(email);
    const isValidPassport = await user.validPassword(password);
    if (!user) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: 'error',
        code: httpCode.UNAUTHORIZED,
        message: 'Invalid email',
      });
    }

    if (user.validPassword(password) === null || !isValidPassport) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: 'error',
        code: httpCode.UNAUTHORIZED,
        message: 'Invalid password',
      });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '8h' });
    user.token = token;
    res.json({
      status: 'success',
      code: httpCode.OK,
      data: {
        user: {
          token: user.token,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = login;
