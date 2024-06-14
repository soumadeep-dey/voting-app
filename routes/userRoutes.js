const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const userController = require("../controllers/userController");

// Signup
router.post("/signup", userController.signup);

// Login
router.post("/login", userController.login);

// profile
router.get("/profile", jwtAuthMiddleware, userController.profile);

// update profile password
router.put(
  "/profile/password",
  jwtAuthMiddleware,
  userController.updatePassword
);

module.exports = router;
