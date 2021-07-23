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

// const getOne = (id) => {
//   return Training.findById(id).populate('books').populate('user');
// };

const getOne = (id) => {
  return Training.findById(id)
    .populate({
      path: 'books',
      select: '-createdAt -updatedAt',
    })
    .populate({
      path: 'user',
      select: '-createdAt -updatedAt -password',
    });
};

// const getCurrent = (userId, trainingId) => {
//   return Training.findOne({ user: userId, _id: trainingId })
//     .populate({
//       path: 'books',
//       select: '-createdAt -updatedAt',
//     })
//     .populate({
//       path: 'user',
//       select: '-createdAt -updatedAt -password',
//     });
// };

const updateOne = (id, body) => {
  return Training.findByIdAndUpdate(id, body, { new: true })
    .populate('books')
    .populate('user');
};

module.exports = {
  addOne,
  getOne,
  // getCurrent,
  updateOne,
};
