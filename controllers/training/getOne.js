const { trainingService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getOne = async (req, res) => {
  const { trainingId } = req.params;

  try {
    const training = await services.getOne(trainingId);

    if (!training) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'fail',
        code: httpCode.BAD_REQUEST,
        message: 'Training not found',
      });
    }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      data: {
        training,
      },
    });
  } catch (error) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: 'fail',
      code: httpCode.BAD_REQUEST,
      message: 'Invalid trainingId',
    });
  }
};

module.exports = getOne;
