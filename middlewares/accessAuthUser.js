const jwt = require('jsonwebtoken');

const { secret } = require('../config/auth.config');

const accessAuthUser = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(403).json({ message: 'You are not authorized!' });
    }

    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (e) {
    res.status(403).json({ error: e });
  }
};

module.exports = accessAuthUser;
