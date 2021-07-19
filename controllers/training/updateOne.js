const { trainingService: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const update = async (req, res, next) => {
  const { trainingId } = req.params;
  try {
    const training = await services.updateOne(trainingId, req.body);
    if (!training) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'fail',
        code: httpCode.BAD_REQUEST,
        message: 'Missing Id',
      });
    }
    res.json({
      status: 'Traning updated',
      code: httpCode.OK,
      data: { training },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
