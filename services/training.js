const { Training } = require('../models');

const addTraining = async (body) => {
  try {
    const training = new Training(body);
    // console.log('servise -> training:', training);
    return await training.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = (filter) => {
  return Training.find(filter).populate('books');
};

module.exports = {
  addTraining,
  getAll,
};
