const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    breed: String,
    gender: String,
    color: String,
    age: String,
    imageUrl: String, 
  },
  {
    timestamps: true,
  }
);

module.exports = model("Pet", petSchema);
