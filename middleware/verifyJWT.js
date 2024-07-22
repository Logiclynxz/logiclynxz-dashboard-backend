require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = { username: decoded.username, email: decoded.email };
    next();
  });
};

module.exports = verifyJWT;
