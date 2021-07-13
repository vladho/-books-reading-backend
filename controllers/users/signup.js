const { userService: services } = require("../../services");
const httpCode = require("../../helpers/constants");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await services.getUserByEmail(email);
    if (result) {
      return res.status(httpCode.CONFLICT).json({
        status: "error",
        code: httpCode.CONFLICT,
        message: "Email in use",
      });
    }
    if (!email || !password) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: "error",
        code: httpCode.BAD_REQUEST,
        message: "Mising some fields",
      });
    }
    const body = {
      email,
      password,
    };
    const user = await services.addUser(body);
    res.status(httpCode.CREATED).json({
      status: "success",
      code: httpCode.CREATED,
      message: "Successfully added",
      data: {
        body,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = signup;
