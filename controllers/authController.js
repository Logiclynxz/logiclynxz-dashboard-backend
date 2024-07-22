require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const login = async (req, res) => {
  try {
    const { usernameEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: usernameEmail }, { email: usernameEmail }],
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const accessToken = jwt.sign(
          { username: user.username, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
          { username: user.username, email: user.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        const userWithUpdatedToken = await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

        if (!userWithUpdatedToken) {
          return res.status(500).json({ message: "Failed to update user with refresh token" });
        }

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res
          .status(200)
          .json({ message: "User authenticated", success: true, accessToken });
      } else {
        return res.status(400).json({
          message: "Invalid username/email or password",
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalid username/email or password",
        success: false,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};


const register = async (req, res) => {
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

module.exports = { login, register };