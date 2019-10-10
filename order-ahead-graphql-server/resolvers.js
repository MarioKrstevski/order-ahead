import mongoose from "mongoose";
// import { orders } from "./mockData";
// import {} from "./mockOwner";
import { restaurants, order, dailyMenu, orders, menu } from "./mockNewData";
import config from "./config.json";
import Cat from './models/Cat'
import Order from './models/Order'
// const DB_URI = config.dbUri;
// mongoose.connect(DB_URI, { useNewUrlParser: true });

// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

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
    makeOrder: async (parent, {date, restaurantName, atLocation, comment, foodName, shift, user}, context, info) => {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        // orderId: Int,
        date,
        restaurantName,
        atLocation,
        comment,
        foodName,
        shift,
        user
      })

      order.save().then(result => console.log("Order created : ", result)).catch(err => console.log('Error order', err))
    },
    cancelOrder: async (parent, {}, context, info) => {},
    updateOrder: async (parent, {}, context, info) => {},

    createDailyMenu: async (parent, {}, context, info) => {},
    updateDailyMenu: async (parent, {}, context, info) => {},
    addFood: async (parent, {}, context, info) => {},
    deleteFood: async (parent, {}, context, info) => {},
    updateFood: async (parent, {}, context, info) => {},
    createCat: async (parent, {name}, context, info) => {
      console.log('Kitty was saved in DB')
      const kitty = new Cat({
          // _id: new mongoose.Types.ObjectId() ,
           name: "Gerry"
          });
      console.log('Kitty was saved in DB 2')

      kitty.save().then((result)=>{ console.log('meow ,', result)}).catch(err => console.log('Error cat', err))
      console.log('Kitty was saved in DB 3')

      
    }
  }
};
