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
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          books: id,
        },
      },
      {
        new: true,
      }
    );
    return Book.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }

  // try {
  // } catch (error) {
  //   throw error;
  // }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
};
