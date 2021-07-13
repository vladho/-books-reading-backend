const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");

const users = {
  signup,
  login,
  logout,
};

module.exports = users;
