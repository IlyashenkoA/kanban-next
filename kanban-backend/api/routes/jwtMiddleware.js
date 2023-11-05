const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = tokenParts[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  });
};

module.exports = jwtMiddleware;
