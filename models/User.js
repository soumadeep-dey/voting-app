const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

// Encrypting Password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(this.password, salt);
    this.password = hassedPassword;
  } catch (err) {
    next(err);
  }
});

// Comparing Password
userSchema.methods.comparePassword = async function (userPwd) {
  try {
    const pwdMatch = await bcrypt.compare(userPwd, this.password);
    return pwdMatch;
  } catch (err) {
    throw err;
  }
};

// Check if user is admin
userSchema.methods.isAdmin = async function (userId) {
  try {
    return userId === this.id && this.role === "admin";
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
