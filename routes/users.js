const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const {
  createUser,
  updateUser,
  archiveUser,
  getUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");


router.use(verifyJWT);

// /api/users
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
