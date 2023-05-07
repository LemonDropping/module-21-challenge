const jwt = require('jsonwebtoken');
require('dotenv').config();

const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

const authMiddleware = async ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  const { data } = verifyToken(token);
  const user = await User.findOne({ _id: data.userId });
  if (!user) {
    throw new AuthenticationError('Invalid token');
  }

  req.user = user;
  return req;
};

module.exports = authMiddleware;
