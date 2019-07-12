// var mongoose = require("mongoose");
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
// const MenusSchema = new Schema(
//     {
//         restaurants: [

//           {
//             name: "Forza",
//             ordersNumber: 6,
//             menu: Array<FoodItem>,
//             shifts: Array<String>
//           },
//           {
//             name: "Enriko",
//             ordersNumber: 23,
//             menu: [
//               {
//                 category: "Salad",
//                 foodName: "Shopska"
//               },
//               { category: "Breakfast", foodName: "Golem omlet so kashlaval" },
//               {
//                 category: "Meat/Fish",
//                 foodName: "Pileshki stek so kari sos"
//               },
//               {
//                 category: "Vegeterian",
//                 foodName: "Avokado meshavina"
//               },
//               { category: "Pizza", foodName: "Capricioza" },
//               { category: "Pasta", foodName: "Spageti Carbonara" }
//             ],
//             shifts: ["10:30", "11:30"]
//           }
//         ]
//       },
//   { timestamps: true }
// );

// export our module to use in server.js
export default mongoose.model("Menu", MenusSchema);
