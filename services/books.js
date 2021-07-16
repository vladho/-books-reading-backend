const { Book } = require('../models');
const { User } = require('../models');

const getAll = (filter) => {
  return Book.find(filter);
};

const getOne = (id) => {
  return Book.findById(id);
};

const addOne = async (userId, body) => {
  try {
    const book = await Book.create(body);
    await User.findByIdAndUpdate(
      userId,
      {
      $push:{
        books: book._id
    }
  },
    {
      new: true,
    })
    return book
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOne = (id) => {
  return Book.findByIdAndDelete(id);
};

module.exports = { getAll, getOne, addOne, deleteOne };
