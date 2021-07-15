const { Book } = require('../models');

const getAll = (filter) => {
  return Book.find(filter);
};

const getOne = (id) => {
  return Book.findById(id);
};

const addOne = async (body) => {
  try {
    const book = new Book(body);
    return await book.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOne = (id) => {
  return Book.findByIdAndDelete(id);
};

module.exports = { getAll, getOne, addOne, deleteOne };
