import mongoose from "mongoose";
import {} from "./mockData";
import {} from "./mockOwner";

mongoose.connect(DB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default {
  Query: {
    getRestaurants: async (parent, {}, context, info) => {},
    getOrder: async (parent, {}, context, info) => {},

    getDailyMenu: async (parent, {}, context, info) => {},

    getOrders: async (parent, {}, context, info) => {},
    getMenu: async (parent, {}, context, info) => {}
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
