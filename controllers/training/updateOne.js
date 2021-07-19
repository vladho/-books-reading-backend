const { trainingService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const update = async (req, res, next) => {
  const { trainingId } = req.params;
  const { body } = req;

  try {
    const training = await services.updateOne(trainingId, body);

    if (!training) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'fail',
        code: httpCode.BAD_REQUEST,
        message: 'Missing Id',
      });
    }

    res.json({
      status: 'Training updated',
      code: httpCode.OK,
      data: {
        training,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
