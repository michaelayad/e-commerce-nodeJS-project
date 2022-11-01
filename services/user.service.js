var validator = require("validator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

//////////////////////////////////////////////////////////////
/*
signup method
*/
const signup = async (body) => {
  var { name, email, password, role } = body;
  //  Check all fields
  if (!role) role = "user";

  if (!name || !email || !password || !role) {
    return {
      type: "Error",
      message: "fieldsRequired",
      statusCode: 400,
    };
  }

  // valid email

  if (!validator.isEmail(email)) {
    return {
      type: "Error",
      message: "invalid email",
      statusCode: 400,
    };
  }

  //  Check if password length less than 8
  if (password.length < 8) {
    return {
      type: "Error",
      message: "passwordLength",
      statusCode: 400,
    };
  }

  //  Make admin role forbidden
  if (!["user", "seller"].includes(role)) {
    return {
      type: "Error",
      message: "roleRestriction",
      statusCode: 400,
    };
  }

  const isEmailTaken = await userModel.isEmailTaken(email);

  //  Check if the email already taken
  if (isEmailTaken) {
    return {
      type: "Error",
      message: "emailTaken",
      statusCode: 409,
    };
  }

  //  Create new user account
  const user = await userModel.create({
    name,
    email,
    password,
    role,
  });

  //  Generate tokens (access token & refresh token)
  const token = await jwt.sign(
    { user_id: user._id, role },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  //  Remove the password from the output
  user.password = undefined;

  // 12) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "successfulSignUp",
    user,
    token,
  };
};

//////////////////////////////////////////////////////////////
/*
login method
*/
const login = async (body) => {
  var { email, password } = body;

  //check all fields
  if (!email || !password) {
    return {
      type: "Error",
      message: "fieldsRequired",
      statusCode: 400,
    };
  }

  const isEmailFound = await userModel.isEmailTaken(email);

  //  Check if the email not found
  if (!isEmailFound) {
    return {
      type: "Error",
      message: "invalid email or password",
      statusCode: 409,
    };
  }

  const user = await userModel.findOne({ email });
  var validpass = bcrypt.compareSync(password, user.password);

  //check password is match

  if (!validpass) {
    return {
      type: "Error",
      message: "invalid email or password",
      statusCode: 409,
    };
  }

  //  Generate tokens (access token & refresh token)
  const token = await jwt.sign(
    { user_id: user._id, role: user.role },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  //  Remove the password from the output
  user.password = undefined;

  // 12) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "successful LogIN",
    user,
    token,
  };
};

module.exports = { signup, login };
