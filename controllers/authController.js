const bcrypt = require("bcrypt");
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
        return res
          .status(200)
          .json({ message: "User authenticated", success: true });
      } else {
        return res.status(400).json({
          message: "Invalid username/email or password",
          success: false,
        });
      }
    } else {
      return res
        .status(400)
        .json({
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
