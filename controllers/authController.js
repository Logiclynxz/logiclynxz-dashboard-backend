const User = require("../models/UserModel");

const login = async (req, res) => {
  try {
    const { usernameEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: usernameEmail }, { email: usernameEmail }],
    });

    if (!user || user.password !== password) {
      return res
        .status(400)
        .json({ message: "Invalid username/email or password" });
    }

    return res
      .status(200)
      .json({ message: "User authenticated", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = login;
