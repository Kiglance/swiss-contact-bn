const { hashSync, compareSync, genSaltSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const hashPassword = (pwd) => {
  const salt = genSaltSync(10);

  return hashSync(pwd, salt);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  const compare = compareSync(plainPassword, hashedPassword);

  return compare;
};

export const generateToken = (payload, expiresIn) => {
  var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export const decodeToken = (token) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  return verify;
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
