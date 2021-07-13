const jwt = require("jsonwebtoken");
const { userService: services } = require("../../services");
const httpCode = require("../../helpers/constants");
require("dotenv").config();

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await services.getUserByEmail(email);
    // console.log(password);
    if (!user || !user.validPassword(password)) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: "error",
        code: httpCode.UNAUTHORIZED,
        message: "Invalid email or password",
      });
    }
    if (!email || !password) {
      res.status(httpCode.BAD_REQUEST).json({
        status: "error",
        code: httpCode.BAD_REQUEST,
        message: "Missing some fields",
      });
    }
    const payload = {
      id: user._id,
    };
    const { JWT_SECRET_KEY } = process.env;
    const token = jwt.sign(payload, JWT_SECRET_KEY);
    user.token = token;
    res.json({
      status: "success",
      code: httpCode.OK,
      data: {
        token: user.token,
        user: {
          email: user.email,
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = login;
