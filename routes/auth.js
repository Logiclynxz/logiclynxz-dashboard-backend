const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const {
  login,
  register,
  refreshToken,
  logout
} = require("../controllers/authController");

// /api/auth
router.post("/login/", login);
router.post("/register/", register);
router.get("/refresh-token/", refreshToken);
router.get("/logout/", logout);

module.exports = router;
