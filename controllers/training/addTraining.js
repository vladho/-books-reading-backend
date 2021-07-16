const { trainingService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const addTraining = async (req, res, next) => {
  const { startDate, finishDate, books } = req.body;
  // console.log('controllers -> training -> req.body:', req.body);
  
  try {
    if (!startDate || !finishDate) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Missing some fields',
      });
    }
    
    const training = await services.addTraining({
      startDate,
      finishDate,
      books,
    });
    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Training added',
      data: {
        training,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = addTraining;
