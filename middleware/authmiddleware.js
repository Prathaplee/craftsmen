const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  console.log('token is ',token);

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = decoded; // Attach the user info to the request
    next();
  });
};

module.exports = authMiddleware;
