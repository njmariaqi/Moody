const jwt = require('jsonwebtoken');
let result = require('dotenv').config();
if (result.error) {
  throw result.error
}
//const secret = 'mysecretsshhhhh';
const secret = process.env.JWT_PASS
const expiration = '2h';


module.exports = {
  authMiddleware: function ({ req }) {
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
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, lastName, email, _id }) {
    const payload = { firstName, lastName, email, _id };

    return jwt.sign({ data: payload }, secret , { expiresIn: expiration });
  },
};
