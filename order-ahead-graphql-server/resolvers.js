import mongoose from "mongoose";
// import { orders } from "./mockData";
// import {} from "./mockOwner";
import { restaurants, order, dailyMenu, orders, menu } from "./mockNewData";
import config from "./config.json";
import Order from "./models/Order";
import Restaurant from "./models/Restaurant";
import DailyMenu from "./models/DailyMenu";
// const DB_URI = config.dbUri;
// mongoose.connect(DB_URI, { useNewUrlParser: true });

// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default {
  Query: {
    getRestaurants: async (parent, {}, context, info) => {
      return await Restaurant.find()
        .then(e => e)
        .catch(e => console.log("Error in getRestaurants ", e));
    },
    getOrder: async (parent, { username, date }, context, info) => {
      console.log("getOrder hit: ", username, date);
      const regex = "^" + date.slice(0, 10);
      return await Order.findOne({ user: "Mario", date: RegExp(regex) })
        .then(e => e)
        .catch(e => console.log("Error in getOrder ", e));
    },

    getDailyMenu: async (parent, { restaurant, date }, context, info) => {
      const regex = "^" + date.slice(0, 10);
      return await DailyMenu.findOne({
        "restaurant.name": restaurant,
        date: RegExp(regex)
      })
        .then(e => e)
        .catch(e => console.log("Error in getRestaurants ", e));
    },

    getOrders: async (parent, { restaurant, date }, context, info) => {
      const regex = "^" + date.slice(0, 10);
      return await Order.find({
        restaurantName: restaurant,
        date: RegExp(regex)
      })
        .then(e => e)
        .catch(e => console.log("Error in getOrders ", e));
    },
    getMenu: async (parent, { restaurant, date }, context, info) => {
      console.log("Ive been hit", restaurant, date);
      return menu;
    }
  },
  Mutation: {
    makeOrder: async (
      parent,
      { date, restaurantName, atLocation, comment, foodName, shift, user },
      context,
      info
    ) => {
      const regex = "^" + date.slice(0, 10);
      return await Order.findOneAndReplace(
        { user: user, date: RegExp(regex) },
        {
          date,
          restaurantName,
          atLocation,
          comment,
          foodName,
          shift,
          user
        },
        {
          upsert: true,
          returnOriginal: false
        }
      )
        .then(e => e)
        .catch(e => console.log("Error in makeOrder ,", e));
    },
    cancelOrder: async (parent, { date, user }, context, info) => {
      const regex = "^" + date.slice(0, 10);
      return await Order.findOneAndDelete({
        user: user,
        date: RegExp(regex)
      })
        .then(e => e)
        .catch(err => console.log("Error in cancelOrder: ,", err));
    },
    updateOrder: async (parent, {}, context, info) => {},

    createDailyMenu: async (parent, {}, context, info) => {},
    updateDailyMenu: async (parent, {}, context, info) => {},
    addFood: async (parent, {}, context, info) => {},
    deleteFood: async (parent, {}, context, info) => {},
    updateFood: async (parent, {}, context, info) => {}
  }
};
