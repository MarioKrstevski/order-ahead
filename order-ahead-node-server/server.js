import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import Comment from "./models/comment";
import Order from "./models/order";
import DailyMenu from "./models/dailyMenu";
import config from "./config.json";

import { users } from "./mockData";

const dailyMenus = [
  {
    restaurant: "Forza",
    date: "23-04-2019",
    ordersNumber: 6,
    menu: [
      {
        category: "Salad",
        foodName: "Cezar Salata"
      },
      { category: "Breakfast", foodName: "Kinoa so Ovosje" },
      {
        category: "Meat/Fish",
        foodName: "Pikanten pileski raznic so BBQ sos"
      },
      {
        category: "Vegeterian",
        foodName: "Rizoto so vrganj i shampnjoni"
      },
      { category: "Pizza", foodName: "Peperoni Pizza" },
      { category: "Pasta", foodName: "Njoki so 4 sirenja" }
    ],
    shifts: ["11:00", "11:30"]
  },
  {
    restaurant: "Enriko",
    date: "23-04-2019",  
    ordersNumber: 23,
    menu: [
      {
        category: "Salad",
        foodName: "Shopska"
      },
      { category: "Breakfast", foodName: "Golem omlet so kashlaval" },
      {
        category: "Meat/Fish",
        foodName: "Pileshki stek so kari sos"
      },
      {
        category: "Vegeterian",
        foodName: "Avokado meshavina"
      },
      { category: "Pizza", foodName: "Capricioza" },
      { category: "Pasta", foodName: "Spageti Carbonara" }
    ],
    shifts: ["10:30", "11:30"]
  }
];
const myOrder = {
  orderId: 5,
  date: "23-04-2019-23-12",  
  restaurant: "Forza",
  atLocation: false,
  comment: "Bez piperki na picata",
  foodChoice: "Peperoni Pizza",
  shift: "10:00",
};
const ownerMenu = [
  {
    foodName: "Fungi Pizza",
    category: "Pizza",
    price: 330
  },
  {
    foodName: "Spageti Carbonara",
    category: "Pasta",
    price: 350
  },

  {
    foodName: "Avokado meshavina",
    category: "Vegeterian",
    price: 300
  },
  {
    foodName: "Pileshki stek so kari sos",
    category: "Meat/Fish",
    price: 310
  },
  {
    foodName: "Golem omlet so kashlaval",
    category: "Breakfast",
    price: 180
  },

  {
    foodName: "Kinoa so Ovosje",
    category: "Salad",
    price: 190
  }
];

const ownerFoods = [
  {
    foodName: "Peperoni Pizza",
    category: "Pizza",
    price: 300
  },
  {
    foodName: "Capricioza",
    category: "Pizza",
    price: 290
  },
  {
    foodName: "Fungi Pizza",
    category: "Pizza",
    price: 330
  },
  {
    foodName: "Spageti Carbonara",
    category: "Pasta",
    price: 350
  },
  {
    foodName: "Spageti Vezuvio",
    category: "Pasta",
    price: 340
  },
  {
    foodName: "Avokado meshavina",
    category: "Vegeterian",
    price: 300
  },
  {
    foodName: "Pileshki stek so kari sos",
    category: "Meat/Fish",
    price: 310
  },
  {
    foodName: "Golem omlet so kashlaval",
    category: "Breakfast",
    price: 180
  },
  {
    foodName: "Kinoa so Ovosje",
    category: "Salad",
    price: 170
  },
  {
    foodName: "Cezar Salata",
    category: "Salad",
    price: 260
  }
];

const ownerOrders = [
  {
    orderId: 5,
    date: "23-04-2019-23-12",
    restaurant: "Forza",
    atLocation: false,
    comment: "Bez piperki na picata",
    foodChoice: "Peperoni Pizza",
    shift: "10:00"
  },
  {
    orderId: 2,
    date: "23-04-2019-22-12",
    restaurant: "Forza",
    atLocation: true,
    comment: "",
    foodChoice: "Pileshki stek so kari sos",
    shift: "10:30"
  },
  {
    orderId: 3,
    date: "23-04-2019-22-22",
    restaurant: "Forza",
    atLocation: false,
    comment: "Extra Sos Da se stavi",
    foodChoice: "Spageti Carbonara",
    shift: "10:30"
  },
  {
    orderId: 4,
    date: "23-04-2019-23-32",
    restaurant: "Forza",
    atLocation: true,
    comment: "",
    foodChoice: "Peperoni Pizza",
    shift: "10:30"
  }
];


// and create our instances
const app = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors({ origin: true, credentials: true }));
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3030

// const API_PORT = process.env.API_PORT || 3000;
const API_PORT = config.port || 3050;
const DB_URI = config.dbUri;
// db config -- We are using mLab set your URI from mLab in secrets.js

// mongoose.connect(getSecret('dbUri'));

mongoose.connect(DB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// now we can set the route path & initialize the API
app.get("/dailymenus", (req, res) => {
  res.json(dailyMenus);
});

app.get("/myOrder", (req, res) => {
  res.json(myOrder);
});

app.get("/ownerFoods", (req, res) => {
  res.json(ownerFoods);
});


app.get("/ownerMenu", (req, res) => {
  res.json(ownerMenu);
});

app.get("/ownerOrders", (req, res) => {
  res.json(ownerOrders);
});




// login route
app.post("/login", (req, res) => {
  // body parser lets us use the req.body
  const { username, password } = req.body;
  if (!username || !password) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: req.body
    });
  }

  let ownerData;
  if (username && password) {
    let ownerDataArray = users.filter(user => user.username === username);
    let ownerData = ownerDataArray[0];
    // we should throw an error. we can do this check on the front end

    if (ownerData) {
      return res.json({
        name: ownerData.name,
        token: ownerData.token,
        role: ownerData.role
      });
    } else {
      return res.json({
        success: false,
        error: "User not found"
      });
    }
  }
});

router.get("/comments", (req, res) => {
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments });
  });
});


router.get("/comments", (req, res) => {
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments });
  });
});

// get Order if exists for loged in user for today's date ( default )
router.get("/myorder", (req, res) => {
  const { userId, dateRequested } = req.body;

  if (!userId || dateRequested) {
    return res.json({
      success: false,
      error: " You need to provide both fields "
    });
  }
  Order.findOne({ belongsTo: userId, date: dateRequested }, (err, myorder) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, myorder });
  });
});

router.get("/dailyMenus", (req, res) => {
  const { dateRequested } = req.body;

  if (!date) {
    return res.json({
      success: false,
      error: "You need to provide date parametar"
    });
  }

  DailyMenu.find({ date: dateRequested }, (err, dailyMenus) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, dailyMenus });
  });
});
// Use our router configuration when we call /api
app.use("/api", router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
