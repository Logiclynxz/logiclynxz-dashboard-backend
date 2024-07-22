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

        const user = await User.findByIdAndUpdate(user._id, { refreshToken });

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res
          .status(200)
          .json({ message: "User authenticated", success: true, accessToken, refreshToken });
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

module.exports = { login };