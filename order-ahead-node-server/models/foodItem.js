var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const FoodItemsSchema = new Schema(
    { category:String, foodName: String, price:Number },
  { timestamps: true }
);

// export our module to use in server.js
export default mongoose.model("FoodItem", FoodItemsSchema);
