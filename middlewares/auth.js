const jwt = require("jsonwebtoken");
//verify the authentication for users
const verifyUser = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["token"];

  if (!token) {
    return res.status(403).json({
      Type: "error",
      message: "A token is required for authentication",
    });
  }
  try {
    var userId, role;
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY,
      function (err, decodedToken) {
        if (err) {
          return res.status(401).json({
            Type: "error",
            message: "Invalid Token",
          });
        } else {
          userId = decodedToken.user_id;
          role = decodedToken.role; // Add to req object
        }
      }
    );
    if (role !== "user") {
      return res.status(403).json({
        Type: "error",
        message: "invalid authorization",
      });
    }
    req.userId = userId;
    req.role = role;
  } catch (err) {
    return res.status(401).json({
      Type: "error",
      message: "Invalid Token",
    });
  }
  return next();
};
//verify the authorization for seller
const verifySeller = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["token"];

  if (!token) {
    return res.status(403).json({
      Type: "error",
      message: "A token is required for authentication",
    });
  }
  try {
    var userId, role;
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY,
      function (err, decodedToken) {
        if (err) {
          return res.status(401).json({
            Type: "error",
            message: "Invalid Token",
          });
        } else {
          userId = decodedToken.user_id;
          role = decodedToken.role; // Add to req object
        }
      }
    );
    if (role !== "seller") {
      return res.status(401).json({
        Type: "error",
        message: "this user can't access this service",
      });
    }
    req.userId = userId;
    req.role = role;
  } catch (err) {
    return res.status(401).json({
      Type: "error",
      message: "Invalid Token",
    });
  }
  return next();
};
//verify the authorization for admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["token"];

  if (!token) {
    return res.status(403).json({
      Type: "error",
      message: "A token is required for authentication",
    });
  }
  try {
    var userId, role;
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY,
      function (err, decodedToken) {
        if (err) {
          return res.status(401).json({
            Type: "error",
            message: "Invalid Token",
          });
        } else {
          userId = decodedToken.user_id;
          role = decodedToken.role; // Add to req object
        }
      }
    );
    if (role !== "admin") {
      return res.status(401).json({
        Type: "error",
        message: "this user can't access this service",
      });
    }
    req.userId = userId;
    req.role = role;
  } catch (err) {
    return res.status(401).json({
      Type: "error",
      message: "Invalid Token",
    });
  }
  return next();
};
//verify the authorization for seller andf admin
const verifySellerWithAdmin = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["token"];

  if (!token) {
    return res.status(403).json({
      Type: "error",
      message: "A token is required for authentication",
    });
  }
  try {
    var userId, role;
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY,
      function (err, decodedToken) {
        if (err) {
          return res.status(401).json({
            Type: "error",
            message: "Invalid Token",
          });
        } else {
          userId = decodedToken.user_id;
          role = decodedToken.role; // Add to req object
        }
      }
    );
    if (role !== "seller" && role !== "admin") {
      return res.status(401).json({
        Type: "error",
        message: "this user can't access this service",
      });
    }
    req.userId = userId;
    req.role = role;
  } catch (err) {
    return res.status(401).json({
      Type: "error",
      message: "Invalid Token",
    });
  }
  return next();
};
module.exports = {
  verifyAdmin,
  verifySeller,
  verifyUser,
  verifySellerWithAdmin,
};
