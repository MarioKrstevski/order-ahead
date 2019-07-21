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
  foodChoice: "Quatro Fromage",
  shift: "10:00"
};

export const dailyMenu = {
  restaurant: { name: "Forza", location: "Taftalidze" },
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
};

export const orders = [
  {
    orderId: 1,
    date: "23-04-2019-10-15",
    restaurant: { name: "Forza", location: "Taftalidze" },
    atLocation: true,
    comment: "Povekje sirenje",
    foodChoice: "Quatro Fromage",
    shift: "10:00",
    user: "Mario"
  },
  {
    orderId: 2,
    date: "23-04-2019-10-15",
    restaurant: { name: "Forza", location: "Taftalidze" },
    atLocation: true,
    comment: "Povekje sirenje",
    foodChoice: "Quatro Fromage",
    shift: "10:00",
    user: "Mario"
  }
];

export const menu = {
  foods: [
    {
      foodName: "Peperoni Pizza",
      category: "Pizza",
      price: 300
    },
    {
      foodName: "Quatro Fromage",
      category: "Pizza",
      price: 360
    }
  ],
  restaurant: { name: "Forza", location: "Taftalidze" }
};
