const { trainingService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getCurrent = async (req, res, next) => {
  // const { query } = req;
  // const { _id: userId } = req.user;
  const { _id: id } = req.user.training;

  // console.log(trainingId);

  try {
    const training = await services.getOne(id);

    // if (!training) {
    //   return res.status(httpCode.BAD_REQUEST).json({
    //     status: 'fail',
    //     code: httpCode.BAD_REQUEST,
    //     message: 'Missing query',
    //   });
    // }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      data: {
        _id: training.id,
        user: training.user.id,
        books: training.books,
        inProgress: training.inProgress,
        startDate: training.startDate,
        finishDate: training.finishDate,
        result: training.result,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getCurrent;
