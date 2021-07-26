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

const updateOne = async (userId, id, body) => {
  const { date, time, pages } = body;
  const { result, books, finishDate } = await Training.findById(id).populate(
    'books'
  );

  const unreadBooks = books.filter((item) => item.status === 'read');

  let readPages = pages;

  const booksToUpdate = [];

  for (const item of unreadBooks) {
    const diff = item.totalPages - item.readPages;
    if (diff > readPages) {
      item.readPages += readPages;
      readPages = 0;
      booksToUpdate.push(item);
      break;
    }
    item.readPages = item.totalPages;
    item.status = 'done';
    booksToUpdate.push(item);
    readPages -= diff;
  }

  const booksUpdateQueries = booksToUpdate.map((item) => {
    const query = Book.findByIdAndUpdate(item._id, {
      readPages: item.readPages,
      status: item.status,
    });
    const promise = query.exec();
    return promise;
  });
  await Promise.all(booksUpdateQueries);

  const totalPages = books.reduce((acc, value) => {
    return acc + value.totalPages;
  }, 0);

  const factPages = result.reduce((acc, value) => {
    const dayFactPages = value.stats.reduce((acc, value) => {
      return acc + value.pages;
    }, 0);
    return acc + dayFactPages;
  }, 0);

  const now = moment();
  console.log(now);

  const formatEndDate = moment(finishDate, 'YYYY-MM-DD');
  console.log(formatEndDate);

  const lastDays = formatEndDate.diff(now, 'days');
  console.log(lastDays);

  let plannedPages = (totalPages - factPages) / lastDays;
  if (plannedPages < 0) {
    plannedPages = 0;
  }
  console.log(plannedPages);
  const endTraining = books.some((item) => item.status === 'read');
  if (!endTraining) {
    await User.findByIdAndUpdate(userId, {
      training: null,
    });
  }

  const newResult = result.find((item) => item.date === date);

  if (newResult) {
    newResult.plannedPages = plannedPages;
    newResult.factPages += pages;
    newResult.stats.push({ time, pages });
  } else {
    result.push({
      date,
      plannedPages,
      factPages: pages,
      stats: [{ time, pages }],
    });
  }

  return await Training.findByIdAndUpdate(
    id,
    {
      inProgress: endTraining,
      result,
    },
    { new: true }
  )
    .populate({
      path: 'books',
      select: '-createdAt -updatedAt',
    })
    .populate({
      path: 'user',
      select: '-token -password -createdAt -updatedAt',
    });
};

/// ////////////////backup/////////////////

// const updateOne = async (id, body) => {
//   const { date, time, pages } = body;
//   console.log(date);
//   const { result, books, endDate } = await Training.findById(id).populate(
//     'books'
//   );
//   const newResult = result.find((item) => item.date === date);
//   if (newResult) {
//     newResult.factPages += pages;
//     newResult.stats.push({ time, pages });
//   } else {
//     const totalPages = books.reduce((acc, value) => {
//       return acc + value;
//     });

//     const factPages = result.reduce((acc, value) => {
//       const dayFactPages = value.stats.reduce((acc, value) => acc + value);
//       return acc + dayFactPages;
//     }, 0);

//     const now = moment();
//     const formatEndDate = moment(endDate).format('YYYY-MM-DD');
//     const lastDays = now.diff(formatEndDate, 'days');
//     const plannedPages = Math.ceil((totalPages - factPages) / lastDays);

//     result.push({ date, plannedPages, stats: [{ time, pages }] });
//   }
//   console.log(result);
//   return await Training.findByIdAndUpdate(id, {
//     result,
//   });
//   // .populate('books')
//   // .populate('user');
// };

/// // 'DD-MM-YYYYTHH:mm:ssZ'

/// ////////////////backup/////////////////

module.exports = {
  addOne,
  getOne,
  // getCurrent,
  updateOne,
};
