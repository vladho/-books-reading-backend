const { Book } = require('../models');
const { User } = require('../models');
// const { Training } = require('../models');

const getAll = (userId) => {
  return Book.find({ user: userId });
};

const getOne = (bookId) => {
  return Book.findById(bookId);
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

const deleteOne = async (userId, bookId) => {
  // trainingId ) => {
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          books: bookId,
        },
      },
      {
        new: true,
      }
    );

    // await Training.findByIdAndUpdate(
    //   trainingId,
    //   {
    //     $pull: {
    //       books: bookId,
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // );

    return Book.findByIdAndDelete(bookId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOne = async (bookId, rating, resume) => {
  try {
    const book = await Book.findByIdAndUpdate(
      // { user: userId, _id: id },
      bookId,
      // {
      //   $set: {
      //     rating,
      //     resume,
      //   },
      // },
      { rating, resume },
      { new: true }
    );
    //   .populate({
    //   path: 'user',
    //   select: '-createdAt -updatedAt -password',
    // });

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
