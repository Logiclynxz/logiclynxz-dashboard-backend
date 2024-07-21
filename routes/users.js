const express = require("express");
const router = express.Router();

const {
    createUser,
    updateUser,
    archiveUser,
    loginUser,
    getUser,
    getUsers
} = require('../controllers/userController')
// API 

module.exports = router;
