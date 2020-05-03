const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  // if not token

  if (!token) {
      res.status(401).json({msg:'No token, authorization denied'})
  }

  //verify token

  try {
    const decode = jwt.verify(token, config.get('jwttoken'));
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(401).json({msg:'TOKEN is not valid'})  
  }
};
