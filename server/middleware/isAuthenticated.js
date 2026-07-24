const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.cookies.token;

    // If token is sent in Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = isAuthenticated;