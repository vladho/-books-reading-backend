const { Training } = require('../models');
const { User } = require('../models');
const { Book } = require('../models');
const moment = require('moment');

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
    // console.log(body.books);

    const booksUpdateQueries = body.books.map((id) => {
      const query = Book.findByIdAndUpdate(id, {
        status: 'read',
      });
      const promise = query.exec();
      return promise;
    });
    await Promise.all(booksUpdateQueries);
    // console.log(result);

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

const updateOne = async (id, body) => {
  const { date, time, pages } = body;
  console.log(date);
  const { result, books, endDate } = await Training.findById(id).populate(
    'books'
  );
  const newResult = result.find((item) => item.date === date);
  if (newResult) {
    newResult.factPages += pages;
    newResult.stats.push({ time, pages });
  } else {
    const totalPages = books.reduce((acc, value) => {
      return acc + value;
    });

    const factPages = result.reduce((acc, value) => {
      const dayFactPages = value.stats.reduce((acc, value) => acc + value);
      return acc + dayFactPages;
    }, 0);

    const now = moment();
    const formatEndDate = moment(endDate).format('YYYY-MM-DD');
    const lastDays = now.diff(formatEndDate, 'days');
    const plannedPages = Math.ceil((totalPages - factPages) / lastDays);

    result.push({ date, plannedPages, stats: [{ time, pages }] });
  }
  console.log(result);
  return await Training.findByIdAndUpdate(id, {
    result,
  });
  // .populate('books')
  // .populate('user');
};

module.exports = {
  addOne,
  getOne,
  // getCurrent,
  updateOne,
};
