const { Book } = require('../models');
const { User } = require('../models');

const getAll = (userId) => {
  return Book.find({ user: userId });
};

// const getOne = (id) => {
//   return Book.findById(id);
// };

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

// const deleteOne = async (userId, id) => {
//   try {
//     await User.findByIdAndUpdate(
//       userId,
//       {
//         $pull: {
//           books: id,
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     return Book.findByIdAndDelete(id);
//   } catch (error) {
//     throw new Error(error.message);
//   }

//   // try {
//   // } catch (error) {
//   //   throw error;
//   // }
// };

const updateOne = async (id, rating, resume) => {
  try {
    const book = await Book.findByIdAndUpdate(
      // { user: userId, _id: id },
      id,
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
  // getOne,
  addOne,
  // deleteOne,
  updateOne,
};
