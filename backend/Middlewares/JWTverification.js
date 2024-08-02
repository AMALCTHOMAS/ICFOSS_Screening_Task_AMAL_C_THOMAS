const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }

  // Split the header into "Bearer" and the token
  const [scheme, token] = authHeader.split(' ');

  // Check if the scheme is "Bearer" and if the token exists
  if (scheme !== 'Bearer' || !token) {
    return res.status(403).send('Invalid token format');
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  
  // Continue to the next middleware or route handler
  return next();
};


module.exports = {
    verifyToken
}