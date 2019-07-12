var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const DailyMenusSchema = new Schema(
    {
        restaurant: String,
        date: String,  
        ordersNumber: Number,
        menu: Array,
        shifts: Array
      },
  { timestamps: true }
);

// export our module to use in server.js
export default mongoose.model("DailyMenu", DailyMenusSchema);
