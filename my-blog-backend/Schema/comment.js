const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    body: String,
    status: {
      type: String,
      role: ["public", "private"],
      default: "public",
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  },

  { timestamps: true, id: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
