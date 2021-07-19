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
  return Training.find(filter).populate('books').populate('user');
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
  addTraining,
  getAll,
  getOne,
  updateOne,
};
