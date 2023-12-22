const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    cover: String,
    status: {
      type: String,
      role: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true, id: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
