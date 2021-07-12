const { User } = require('../models');

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    return await User.findOne({ _id: id });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addUser = async (body) => {
  try {
    const user = new User(body);
    return await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateToken = async (id, token) => {
  try {
    return await User.updateOne({ _id: id }, { token });
  } catch (error) {
    throw new Error(error.message);
  }
};

const userService = {
  getUserByEmail,
  getUserById,
  addUser,
  updateToken,
};

module.exports = userService;
