const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const updateUser = require('./updateOne');

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateUser,
};
