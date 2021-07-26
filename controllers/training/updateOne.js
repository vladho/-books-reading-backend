const { trainingService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const updateOne = async (req, res, next) => {
  //   const userId = req.user.id;
  const user = req.user;

  if (!user.training) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: 'fail',
      code: httpCode.BAD_REQUEST,
      message: 'No current training in user',
      //   data: null,
    });
  }

  const { _id: id } = user.training;

  const { body } = req;

  try {
    const training = await services.updateOne(user._id, id, body);

    // if (book.readPages !== book.totalPages && book.status !== 'done') {
    //   return res.status(httpCode.FORBIDDEN).json({
    //     status: 'error',
    //     code: httpCode.FORBIDDEN,
    //     message: 'The book has not been read yet',
    //   });
    // }

    // if (!book || !id) {
    //   return res.status(httpCode.NOT_FOUND).json({
    //     status: 'error',
    //     code: httpCode.NOT_FOUND,
    //     message: 'Not Found',
    //   });
    // }

    // if (!book || !user.books.includes(id)) {
    //   return res.status(400).send({ message: "Invalid 'bookId'" });
    // }

    // if (!rating || !resume) {
    //   return res.status(httpCode.NOT_FOUND).json({
    //     status: 'error',
    //     code: httpCode.NOT_FOUND,
    //     message: 'Missing field',
    //   });
    // }
    // console.log(training);
    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      // message: 'Resume added',
      data: {
        _id: training.id,
        user: training.user,
        books: training.books,
        inProgress: training.inProgress,
        startDate: training.startDate,
        finishDate: training.finishDate,
        result: training.result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateOne;
