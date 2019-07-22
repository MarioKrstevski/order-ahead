export const restaurants = [
  { name: "Forza", location: "Taftalidze" },
  { name: "Enriko", location: "Leptokarija" }
];

export const order = {
  orderId: 1,
  date: "23-04-2019-10-15",
  restaurant: { name: "Forza", location: "Taftalidze" },
  atLocation: true,
  comment: "Povekje sirenje",
  food: {
    category: "Salad",
    name: "Quatro Fromage",
    price: 360
  },
  shift: "10:00"
};

export const dailyMenu = {
  restaurant: { name: "Forza", location: "Taftalidze" },
  date: "23-04-2019",
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
    restaurant: { name: "Forza", location: "Taftalidze" },
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
    date: "23-04-2019-10-15",
    restaurant: { name: "Forza", location: "Taftalidze" },
    atLocation: true,
    comment: "Povekje sirenje",
    food : {
      name: "Quatro Fromage",
      category: "Pizza",
      price: 360
    },
    shift: "10:00",
    user: "Mario"
  }
];

export const menu = {
  food: [
    {
      name: "Peperoni Pizza",
      category: "Pizza",
      price: 300
    },
    {
      name: "Quatro Fromage",
      category: "Pizza",
      price: 360
    }
  ],
  restaurant: { name: "Forza", location: "Taftalidze" }
};
