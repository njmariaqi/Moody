const jwt = require('jsonwebtoken');
require('dotenv').config();
// const secret = process.env.JWT_PASS
const secret = 'mygod';
const expiration = '2h';
let count = 1;


module.exports = {
  authMiddleware: function ({ req }) {
    console.log('authmiddleware',count)
    count ++;
    let token = req.body.token || req.query.token || req.headers.authorization;
    
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.error(err, 'Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, lastName, email, _id }) {
    const payload = { firstName, lastName, email, _id };

    return jwt.sign({ data: payload }, secret , { expiresIn: expiration });
  },
};
