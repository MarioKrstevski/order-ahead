import mongoose from "mongoose";
// import { orders } from "./mockData";
// import {} from "./mockOwner";
import { restaurants, order, dailyMenu, orders, menu } from "./mockNewData";
import config from "./config.json";

const DB_URI = config.dbUri;
mongoose.connect(DB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default {
  Query: {
    getRestaurants: async (parent, {}, context, info) => {
      return restaurants;
    },
    getOrder: async (parent, {}, context, info) => {
      return order;
    },

    getDailyMenu: async (parent, {}, context, info) => {
        return dailyMenu;
    },

    getOrders: async (parent, {}, context, info) => {
        return orders;
    },
    getMenu: async (parent, {restaurant, date}, context, info) => {
        console.log('Ive been hit', restaurant, date)
        return menu;
    }
  },
  Mutation: {
    makeOrder: async (parent, {}, context, info) => {},
    cancelOrder: async (parent, {}, context, info) => {},
    updateOrder: async (parent, {}, context, info) => {},

    createDailyMenu: async (parent, {}, context, info) => {},
    updateDailyMenu: async (parent, {}, context, info) => {},
    addFood: async (parent, {}, context, info) => {},
    deleteFood: async (parent, {}, context, info) => {},
    updateFood: async (parent, {}, context, info) => {}
  }
};
