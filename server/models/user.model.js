const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    email: String,
    phone: String, 
    password: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
