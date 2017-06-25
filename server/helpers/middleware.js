const jwt = require('jsonwebtoken');
const secret = 'docmanagementsystem';
const User = require('../models').users;

module.exports = {
  verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({ success: false, message: 'No token provided.' });
    }
    // verifies secret
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      req.decoded = decoded;
      next();
    });
  },

  verifyRole(req, res, next) {
    const roleId = req.decoded.roleId;
    if (roleId !== 1) {
      return res.status(403).send({
        message: 'You do not have permission to access this'
      });
    }
    next();
  }
};

