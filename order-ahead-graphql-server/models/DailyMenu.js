import mongoose from "mongoose";

const DailyMenuSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurant: {
    name: String,
    location: String,
    orderMax: Number,
    telephone: String
  },
  date: String,
  food: [
    {
      category: String,
      name: String,
      price: Number
    }
  ],
  shifts: [String]
});

module.exports = mongoose.model("DailyMenu", DailyMenuSchema);
