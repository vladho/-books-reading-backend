const dotenv = require('dotenv');

dotenv.config();

// const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    console.log('signup');
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (req, res, next) => {
  try {
    console.log('login');
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async (req, res, next) => {
  try {
    console.log('logout');
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
