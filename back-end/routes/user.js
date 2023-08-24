const express = require("express");
const User = require("../models/userModel");

const router = express.Router();
// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

// login route
router.post("/login", loginUser);
// signuo route
router.post("/signup", signupUser);

module.exports = router;
