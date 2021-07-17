const { Book } = require('../models');
const { User } = require('../models');

const getAll = (filter) => {
  return Book.find(filter);
};

const getOne = (id) => {
  return Book.findById(id);
  // console.log(newBook);
};

const addOne = async (userId, body) => {
  try {
    const book = await Book.create(body);
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          books: book._id,
        },
      },
      {
        new: true,
      }
    );
    return book;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOne = async (userId, id) => {
  console.log(id);
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          books: {
            _id: id,
          },
        },
      },
      {
        new: true,
      }
    );
  } catch (error) {
    throw error;
  }
  return;
  // Book.findByIdAndDelete(id);
};

module.exports = { getAll, getOne, addOne, deleteOne };
