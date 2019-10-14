import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurant: String,
  food: [
    {
      category: String,
      name: String,
      price: Number
    }
  ],
});

module.exports = mongoose.model("Menu", MenuSchema);
