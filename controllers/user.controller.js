const authService = require("../services/user.service");
const signup = async (req, res, next) => {
  //  Calling sign up service
  const { type, message, statusCode, user, token } = await authService.signup(
    req.body
  );

  //  Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  //  If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    user,
    token,
  });
};
const login = async (req, res, next) => {
  const { type, message, statusCode, user, token } = await authService.login(
    req.body
  );
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }
  return res.status(statusCode).json({
    type,
    message,
    user,
    token,
  });
};
module.exports = { signup, login };
