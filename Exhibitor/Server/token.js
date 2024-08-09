const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'Your Private Key', (err, exhibitor) => {
    if (err) return res.sendStatus(403);
    req.exhibitor = exhibitor;
    next();
  });
};

module.exports = authenticateToken;
