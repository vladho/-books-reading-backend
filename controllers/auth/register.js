const jwt = require('jsonwebtoken');
const { userService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');
require('dotenv').config();

const { JWT_SECRET_KEY } = process.env;

const register = async (req, res, next) => {
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

    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '8h' });
    newUser.token = token;

    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Successfully added',
      data: {
        user: {
          id: newUser._id,
          token: newUser.token,
          name: newUser.name,
          email: newUser.email,
          books: newUser.books,
          training: newUser.training,
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = register;
