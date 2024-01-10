const jwt = require("jsonwebtoken");
const env = require("../config/env.config");

function authGuard(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    console.log(payload);
    req.id = payload.id;
    req.role = payload.role;
    next();
  } catch (error) {
    res.status(403).json({ message: `Cannot ${req.method} ${req.originalUrl}: ` + error.message });
  }
}

module.exports = authGuard;
