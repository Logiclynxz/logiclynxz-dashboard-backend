const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const { login, register } = require("../controllers/authController");

// /api/auth
router.post("/login/", login);
router.post("/register/", register);

module.exports = router;
