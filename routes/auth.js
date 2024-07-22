const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");

// /api/auth
router.post("/login/", login);

module.exports = router;
