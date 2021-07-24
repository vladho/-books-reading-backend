const { Training } = require('../models');
const { User } = require('../models');
const { Book } = require('../models');
const moment = require('moment');
// console.log(moment());
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

// const updateOne = async (id, body) => {
//   const { date, time, pages } = body;
//   const { result, books, finishDate } = await Training.findById(id).populate(
//     'books'
//   );

//   const newResult = result.find((item) => item.date === date);
//   if (newResult) {
//     newResult.factPages += pages;
//     newResult.stats.push({ time, pages });
//   } else {
//     const totalPages = books.reduce((acc, value) => {
//       return acc.totalPages + value.totalPages;
//     });

//     const factPages = result.reduce((acc, value) => {
//       const dayFactPages = value.stats.reduce((acc, value) => {
//         acc + value.pages;
//       });
//       return acc + dayFactPages.pages;
//     }, 0);
//     // console.log(factPages);

//     const now = moment();
//     // console.log(now);
//     const formatEndDate = moment(finishDate, 'DD-MM-YYYYTHH:mm:ssZ');
//     // console.log(formatEndDate);

//     const lastDays = formatEndDate.diff(now, 'days');
//     // console.log(lastDays);

//     const plannedPages = Math.ceil((totalPages - factPages) / lastDays);
//     // console.log(plannedPages);

//     result.push({ date, plannedPages, stats: [{ time, pages }] });
//   }
//   // console.log(result);
//   return await Training.findByIdAndUpdate(id, {
//     result,
//   }).populate('books');
// };

const updateOne = async (id, body) => {
  const { date, time, pages } = body;
  const { result, books, finishDate } = await Training.findById(id).populate(
    'books'
  );
  const newResult = result.find((item) => item.date === date);
  if (newResult) {
    newResult.factPages += pages;
    newResult.stats.push({ time, pages });
  } else {
    const totalPages = books.reduce((acc, value) => {
      return acc.totalPages + value.totalPages;
    });

    const factPages = result.reduce((acc, value) => {
      const dayFactPages = value.stats.reduce(
        (acc, value) => acc + value.pages
      );
      return acc + dayFactPages.pages;
    }, 0);

    const now = moment();
    const formatEndDate = moment(finishDate).format('YYYY-MM-DD');
    const lastDays = formatEndDate.diff(now, 'days');
    const plannedPages = Math.ceil((totalPages - factPages) / lastDays);

    result.push({ date, plannedPages, stats: [{ time, pages }] });
  }
  return await Training.findByIdAndUpdate(id, {
    result,
  });
};

///////////////////backup/////////////////

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

///// 'DD-MM-YYYYTHH:mm:ssZ'

///////////////////backup/////////////////

module.exports = {
  addOne,
  getOne,
  // getCurrent,
  updateOne,
};
