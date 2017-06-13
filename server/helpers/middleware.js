const jwt = require('jsonwebtoken');
const secret = 'docmanagementsystem';
const User = require('../models').users;

module.exports = {
  verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({ success: false, message: 'No token provided.' });
    }
    // verifies secret and checks exp
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      req.decoded = decoded;
      next();
    });
  },

};

