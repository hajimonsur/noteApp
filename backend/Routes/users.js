const express = require("express");
const { login, signup, resetPassword } = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// Public Routes
router.post("/register", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);



module.exports = router;
