const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "Token not found" });
    }
    const token = authorization.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorized" });
    // Verify and extract payload
    req.userPayload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log("❓️ Invalid Token");
    res.status(403).json({ message: "Invalid Token" });
  }
};

const generateToken = async (userPayload) => {
  return jwt.sign(userPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { jwtAuthMiddleware, generateToken };
