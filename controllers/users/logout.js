const { userService: services } = require("../../services");
const httpCode = require("../../helpers/constants");

const logout = async (req, res, next) => {
  const { user } = req;

  try {
    await services.updateToken(user._id, { token: null });
    res.status(httpCode.NO_CONTENT).json({
      status: "success",
      code: 204,
      message: "Success logout",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = logout;
