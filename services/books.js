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

const updateOne = async (userId, id, rating, resume) => {
  try {
    const book = await Book.findByIdAndUpdate(
      { _id: id, user: userId },
      // {
      //   $set: {
      //     rating,
      //     resume,
      //   },
      // },
      { rating, resume },
      { new: true }
    ).populate('user');
    return book;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
