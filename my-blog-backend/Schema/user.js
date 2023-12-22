const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      role: ["pending", "approved", "decline", "blocked"],
      default: "pending",
    },
  },

  { timestamps: true, id: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
