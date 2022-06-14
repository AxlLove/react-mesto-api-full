require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (payload) => {
  console.log(NODE_ENV, JWT_SECRET);
  const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
  console.log(token);
  return token;
};

module.exports = { generateToken };
