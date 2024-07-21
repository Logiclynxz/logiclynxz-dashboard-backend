const User = require("../models/UserModel");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    const exists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "Username and email already exists" });
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
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const exists = await User.findOne({
      $and: [{ $or: [{ username, email }] }, { _id: { $ne: id } }],
    });

    if (exists) {
      return res
        .status(400)
        .json({ success:false, message: "Username and email already exists" });
    }

    const usernameExists = await User.findOne({
      $and: [{ username }, { _id: { $ne: id } }],
    });
    if (usernameExists) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const emailExists = await User.findOne({
      $and: [{ email }, { _id: { $ne: id } }],
    });
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const archiveUser = async (req, res) => {
  const { id } = req.params;
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (user) {
      return res.status(200).json({ message: "User successfully deleted" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  archiveUser,
  deleteUser,
};
