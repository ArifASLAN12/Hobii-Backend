const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token gerekli.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded.isAdmin) {
      return res.status(403).json({ message: 'Erişim reddedildi.' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = adminAuth;