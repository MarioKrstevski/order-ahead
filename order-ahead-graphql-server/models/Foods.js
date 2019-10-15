import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  food: {
      category: String,
      name: String,
      price: Number
    }
});

module.exports = mongoose.model("Food", FoodSchema);
