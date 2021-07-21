const { Training } = require('../models');
const { User } = require('../models');

const addOne = async (userId, body) => {
  try {
    const training = await Training.create(body);
    await User.findByIdAndUpdate(
      userId,
      {
        training: training._id,
      },
      {
        new: true,
      }
    );
    return training;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = (userId) => {
  return Training.find({ user: userId }).populate('books').populate('user');
};

const getOne = (id) => {
  return Training.findById(id).populate('books').populate('user');
};

const updateOne = (id, body) => {
  return Training.findByIdAndUpdate(id, body, { new: true })
    .populate('books')
    .populate('user');
};

module.exports = {
  addOne,
  getAll,
  getOne,
  updateOne,
};
