import mongoose from "mongoose";
// import { orders } from "./mockData";
// import {} from "./mockOwner";
import { restaurants, order, dailyMenu, orders, menu } from "./mockNewData";
import config from "./config.json";
import Cat from "./models/Cat";
import Order from "./models/Order";
// const DB_URI = config.dbUri;
// mongoose.connect(DB_URI, { useNewUrlParser: true });

// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default {
  Query: {
    getRestaurants: async (parent, {}, context, info) => {
      return restaurants;
    },
    getOrder: async (parent, { username, date }, context, info) => {
      console.log("getOrder hit: ", username, date);
      const regex = "^" + date.slice(0, 10);
      return await Order.findOne({ user: "Mario", date: RegExp(regex) })
        .then(e => e)
        .catch(e => console.log("Error in getOrder ", e));
    },

    getDailyMenu: async (parent, {}, context, info) => {
      
      return dailyMenu;
    },

    getOrders: async (parent, {}, context, info) => {
      return orders;
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
      let finished;
      const regex = "/^" + date.slice(0.1) + "/";
      console.log("Vidi ovoj ", { user: user, $or: [{ date: RegExp(regex) }] });
      try {
        finished = await Order.findOneAndReplace(
          { user: user, $or: [{ date: RegExp(regex) }] },
          {
            // _id: new mongoose.Types.ObjectId(),
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
            returnNewDocument: true
          },
          function(err, order) {
            if (err) {
              console.log("Error in the query");
            }

            console.log("ORDER ::: ", order);
            finished = order;
            return order;
          }
        );
      } catch (e) {
        console.log(e);
      }

      console.log("Finished", finished);
      return finished;
    },
    cancelOrder: async (parent, { date, user }, context, info) => {
      let canceledOrder = false;
      try {
        canceledOrder = await Order.findOneAndDelete(
          { user: "Mario", $or: [{ date: /^2019-10-10/ }] },
          function(err, resp) {
            if (err) {
              console.log("Mongoose failed findOneAndDelte", err);
            }
            console.log("[CancelOrder]", resp);
            canceledOrder = resp;
            return resp;
          }
        );
        return canceledOrder;
      } catch (e) {
        console.log("Couldnt do cancel order, error :", e);
      }
    },
    updateOrder: async (parent, {}, context, info) => {},

    createDailyMenu: async (parent, {}, context, info) => {},
    updateDailyMenu: async (parent, {}, context, info) => {},
    addFood: async (parent, {}, context, info) => {},
    deleteFood: async (parent, {}, context, info) => {},
    updateFood: async (parent, {}, context, info) => {},
    createCat: async (parent, { name }, context, info) => {
      console.log("Kitty was saved in DB");
      const kitty = new Cat({
        // _id: new mongoose.Types.ObjectId() ,
        name: "Gerry"
      });
      console.log("Kitty was saved in DB 2");

      kitty
        .save()
        .then(result => {
          console.log("meow ,", result);
        })
        .catch(err => console.log("Error cat", err));
      console.log("Kitty was saved in DB 3");
    }
  }
};
