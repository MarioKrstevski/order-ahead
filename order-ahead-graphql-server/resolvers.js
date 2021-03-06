import mongoose from "mongoose";
// import { orders } from "./mockData";
// import {} from "./mockOwner";
import { restaurants, order, dailyMenu, orders, menu } from "./mockNewData";
import config from "./config.json";
import Order from "./models/Order";
import Restaurant from "./models/Restaurant";
import DailyMenu from "./models/DailyMenu";
import Menu from "./models/Menu";
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
      const regex = "^" + date.slice(0, 10);
      return await Order.findOne({ user: username, date: RegExp(regex) })
        .then(e => e)
        .catch(e => console.log("Error in getOrder ", e));
    },

    getDailyMenu: async (parent, { restaurant, date }, context, info) => {
      console.log("getDailyMenu HIT : restaurant ,user", restaurant, date);

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
    getMenu: async (parent, { restaurant }, context, info) => {
      console.log("getMenu is being HIT");
      return await Menu.findOne({ restaurant: restaurant })
        .then(e => e)
        .catch(e => console.log("Error in getOrders ", e));
    }
  },
  Mutation: {
    upsertOrder: async (
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
      console.log("cancleOrder HIT : date,user", date, user);
      const regex = "^" + date.slice(0, 10);
      return await Order.findOneAndDelete({
        user: user,
        date: RegExp(regex)
      })
        .then(e => e)
        .catch(err => console.log("Error in cancelOrder: ,", err));
    },

    upsertDailyMenu: async (
      parent,
      { restaurantName, date, foods },
      context,
      info
    ) => {
      // console.log(
      //   "upsertDailyMenu HIT : date,user",
      //   restaurantName,
      //   date,
      //   foods
      // );

      const restaurantFullObject = await Restaurant.findOne({
        name: restaurantName
      });

      const restaurantFullObjectNoID = {
        name: restaurantFullObject.name,
        location: restaurantFullObject.location,
        orderMax: restaurantFullObject.orderMax,
        telephone: restaurantFullObject.telephone,
        shifts: restaurantFullObject.shifts
      };
      // console.log('Restaurant full object:', restaurantFullObject)F

      return await DailyMenu.findOneAndReplace(
        {
          "restaurant.name": restaurantName,
          date: date
        },
        {
          restaurant: restaurantFullObjectNoID,
          date,
          ordersNumber: 6,
          food: foods,
          shifts: restaurantFullObjectNoID.shifts
        },
        { upsert: true, returnOriginal: false }
      );
    },
    addFood: async (parent, {}, context, info) => {},
    deleteFood: async (parent, {}, context, info) => {},
    updateFood: async (parent, {}, context, info) => {}
  }
};
