import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  location: String,
  orderMax: Number,
  telephone: String
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
