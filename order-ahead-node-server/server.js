import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Comment from './models/comment';
import Order from './models/order';
import DailyMenu from './models/dailyMenu';
import config from './config.json';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3030


// const API_PORT = process.env.API_PORT || 3000;
const API_PORT = config.port || 3050;
const DB_URI = config.dbUri;
// db config -- We are using mLab set your URI from mLab in secrets.js

// mongoose.connect(getSecret('dbUri'));


mongoose.connect(DB_URI,{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments });
  });
});

// get Order if exists for loged in user for today's date ( default )
router.get('/myorder', (req, res) => {
  const { userId, dateRequested } = req.body;

  if ( !userId || dateRequested){
    return res.json({
      success:false,
      error: ' You need to provide both fields '
    })
  }
  Order.findOne({ 'belongsTo': userId, 'date': dateRequested },(err, myorder) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, myorder });
  });
});


router.get('/dailyMenus', (req, res) => {

  const { dateRequested } = req.body;

  if ( !date ){
    return res.json({
      success:false,
      error: 'You need to provide date parametar'
    })
  }

  DailyMenu.find({'date': dateRequested}, (err, dailyMenus) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({success: true, dailyMenus})
  })
})
// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));