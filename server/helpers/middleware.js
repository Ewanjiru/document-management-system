const jwt = require('jsonwebtoken');
const secret = 'docmanagementsystem';
const Document = require('../models').documents;

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({ success: false, message: 'No token provided.' });
    }
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
    if (roleId !== 2) {
      return res.status(403).send({
        message: 'You do not have permission to access this'
      });
    }
    next();
  },
};

