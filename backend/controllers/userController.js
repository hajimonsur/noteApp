const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// handle signup
exports.signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      username,
      password: hashPassword,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle login
exports.login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      authToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body; // email used to find the user
  try {
    const user = await User.findOne({ email }); // Find the user by email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred, please try again." });
  }
};

// Get user details
exports.userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
