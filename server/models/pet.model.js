const { Schema, model } = require("mongoose");
const User = require("./user.model");

const petSchema = new Schema(
  {
    animal: String,
    petname:String,
    breed: String,
    gender: String,
    color: String,
    age: String,
    imageUrl: String, 
    comment:String,
    owner: { type: Schema.Types.ObjectId, ref: "User" }, 
  },
  {
    timestamps: true,
  }
);

module.exports = model("Pets", petSchema);
