const { Training } = require('../models');
const { User } = require('../models');

const addTraining = async (userId, body) => {
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

const getAll = (filter) => {
  return Training.find(filter).populate('books');
};

const getOne = (id) => {
  return Training.findById(id).populate('books');
};

module.exports = {
  addTraining,
  getAll,
  getOne,
};
