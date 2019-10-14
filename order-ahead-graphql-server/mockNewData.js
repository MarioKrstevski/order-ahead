export const restaurants = [
  { name: "Forza", location: "Taftalidze", orderMax: 45, telephone: '38977555560', shifts:["10:00","10:30"] },
  { name: "Enriko", location: "Leptokarija", orderMax: 30, telephone: '38977424565' ,shifts:["10:00","10:30","11:00"] }
];

export const order = {
  date: "2019-10-14-10-15",
  restaurantName: "Forza",
  atLocation: true,
  comment: "Povekje sirenje",
  foodName:"Quatro Fromage",
  shift: "10:00",
  user: "Mario"
};

export const dailyMenu = {
  restaurant: { name: "Forza", location: "Taftalidze", orderMax: 45, telephone: '38977555560' },
  date: "2019-10-14",
  ordersNumber: 6,
  food: [
    {
      category: "Salad",
      name: "Cezar Salata",
      price: 140
    },
    { category: "Breakfast", name: "Kinoa so Ovosje", price: 140 },
    {
      category: "Meat/Fish",
      name: "Pikanten pileski raznic so BBQ sos",
      price: 140
    },
    {
      category: "Vegeterian",
      name: "Rizoto so vrganj i shampnjoni",
      price: 140
    },
    { category: "Pizza", name: "Peperoni Pizza" ,price: 140},
    { category: "Pasta", name: "Njoki so 4 sirenja" ,price: 140}
  ],
  shifts: ["11:00", "11:30"]
};

export const orders = [
  {
    orderId: 1,
    date: "23-04-2019-10-15",
    restaurant: { name: "Forza", location: "Taftalidze", orderMax: 45, telephone: '38977555560' },
    atLocation: true,
    comment: "Povekje sirenje",
    food: {
      name: "Quatro Fromage",
      category: "Pizza",
      price: 360
    },
    shift: "10:00",
    user: "Mario"
  },
  {
    orderId: 2,
    date: "23-04-2019-10-52",
    restaurant: { name: "Forza", location: "Taftalidze", orderMax: 45, telephone: '38977555560' },
    atLocation: true,
    comment: "4 jajca ",
    food : {
      name: "Omlet",
      category: "Breakfast",
      price: 120
    },
    shift: "10:00",
    user: "Stole"
  },
  {
    orderId: 3,
    date: "23-04-2019-10-22",
    restaurant: { name: "Forza", location: "Taftalidze", orderMax: 45, telephone: '38977555560' },
    atLocation: true,
    comment: "Povekje pechena sakam da e ",
    food : {
      name: "Cappricioza",
      category: "Pizza",
      price: 320
    },
    shift: "10:00",
    user: "Stole"
  }
];

export const menu = {
  food: [
    {
      name: "Forza Pizza",
      category: "Pizza",
      price: 300
    },
    {
      name: "Domashna",
      category: "Pizza",
      price: 320
    },
    {
      name: "Salami",
      category: "Pizza",
      price: 310
    },
    {
      name: "Capricciosa",
      category: "Pizza",
      price: 340
    },
    {
      name: "Grass From Yard",
      category: "Vegeterian",
      price: 350
    },
    {
      name: "Fruit Salad",
      category: "Vegeterian",
      price: 360
    },
    {
      name: "Avocado Storm",
      category: "Vegeterian",
      price: 700
    },
    {
      name: "Spagetti Quator Formage",
      category: "Pasta",
      price: 100
    },
    {
      name: "Njoki Bailico",
      category: "Pasta",
      price: 220
    },
    {
      name: "Njoki Quatro Fromage",
      category: "Pasta",
      price: 210
    },
    {
      name: "Carbonara Spagetti",
      category: "Pasta",
      price: 240
    },
    {
      name: "Turbo Wakeup",
      category: "Breakfast",
      price: 250
    },
    {
      name: "Ribs",
      category: "Meat/Fish",
      price: 260
    },
    {
      name: "Steak with fries",
      category: "Meat/Fish",
      price: 111
    },
    {
      name: "Salmon",
      category: "Meat/Fish",
      price: 1112
    },
    {
      name: "Kremenadla",
      category: "Meat/Fish",
      price: 112
    },
    {
      name: "Caesar",
      category: "Salad",
      price: 434
    },
     {
      name: "Macedonian Salad",
      category: "Salad",
      price: 424
    },
    {
      name: "Small Breakfast",
      category: "Breakfast",
      price: 444
    }
  ],
  restaurant: "Forza",  
};
