var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const OrdersSchema = new Schema(
  {
    orderId: Number,
    date: String,  
    restaurant: String,
    atLocation: Boolean,
    comment: String,
    foodChoice: String,
    shift: String,
  },
  { timestamps: true }
);

// export our module to use in server.js
export default mongoose.model("Order", OrdersSchema);
