const jwt = require("jsonwebtoken");
const path = require("path");
const rootDir = require("./path.helper");
const User = require("../models/user.models");
require("dotenv").config({ path: path.join(rootDir, "secure", ".env") });

const maxAge = 3 * 24 * 60 * 60; // 3days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: maxAge });
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    req.isAuth = false;
    next()
  } else {
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
      if (err) {
        req.isAuth = false;
        next()
      } else {
        let user = await User.findById(decodedToken.id);

        req.userInfo = user;

        req.isAuth = true;
        
        next();
      }
    });
  }
};

module.exports = {
  createToken,
  checkUser
};