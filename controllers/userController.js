const User = require("../models/User");
const { generateToken } = require("../middleware/jwt");

const userController = {
  signup: async (req, res) => {
    try {
      // DB save
      const userData = req.body;
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      //Generate token
      const userPayload = {
        id: savedUser.id,
      };
      const token = await generateToken(userPayload);
      // Response send
      console.log("✅ User data saved");
      res.status(200).json({ savedUser, token });
    } catch (err) {
      console.log("⛔️ Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    try {
      // Check if user exists
      const { voterId, password } = req.body;
      const user = await User.findOne({ voterId: voterId });
      if (!user || !(await user.comparePassword(password))) {
        console.log("❌ Invalid userId or password");
        return res.status(401).json({ error: "Invalid userId or password" });
      }
      // Generate token
      const userPayload = { id: user.id };
      const token = await generateToken(userPayload);
      // Response send
      console.log("✅ User logged in");
      res.status(200).json({ token });
    } catch (err) {
      console.log("⛔️ Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  profile: async (req, res) => {
    try {
      const userId = req.userPayload.id;
      const user = await User.findById(userId);
      if (!user) {
        console.log("❌ User not found");
        return res.status(404).json({ error: "User not found" });
      }
      console.log("✅ Profile details fetched");
      res.status(200).json(user);
    } catch (err) {
      console.log("⛔️ Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const userId = req.userPayload.id;
      const updatePwd = req.body;
      // Handling so that user can only update password
      if (Object.keys(updatePwd).length !== 1 || !updatePwd.password)
        return res.status(422).json({ message: "can only update password" });
      // DB Update
      const updatedUser = await User.findByIdAndUpdate(userId, updatePwd);
      if (!updatedUser) {
        return res.status(404).json({ error: "Person not found" });
      }
      console.log("✅ User password updated");
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log("⛔️ Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userController;
