const User = require("../models/UserModel");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    const exists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (exists) {
      return res.status(400).json({ message: "Username and email already exists" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
};

const archiveUser = async (req, res) => {
  const { id } = req.params;
};

const loginUser = async (req, res) => {};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  archiveUser,
  loginUser,
};
