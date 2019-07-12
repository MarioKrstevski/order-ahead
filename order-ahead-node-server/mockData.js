export const restaurants = ["Forza", "Enriko"];

export const foodsList = [
  {
    restaurant: "Forza",
    foods: [
      {
        foodName: "Peperoni Pizza",
        category: "Pizza",
        price: 300
      }
    ]
  },
  {
    restaurant: "Enriko",
    foods: [
      {
        foodName: "Peperoni Pizza",
        category: "Pizza",
        price: 300
      }
    ]
  }
];

export const orders = [
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
    orderId: 5,
    date: "23-04-2019-23-12",
    restaurant: "Forza",
    atLocation: false,
    comment: "Bez piperki na picata",
    foodChoice: "Peperoni Pizza",
    shift: "10:00"
  }
];

export const users = [{
    username:"mario@order.com",
    password:"mario123",
    name: "Mario",
    token: 'abcdefgh',
    role: "employee",
  },{
    username:"stefan@order.com",
    password:"stefanabc",
    name: "Stefan",
    token: '12345678',
    role: "owner",
  },{
    username:"admin@order.com",
    password:"admin123",
    name: "Admin",
    token: '1234abcd',
    role: "all",
  }];

  export const dailyMenus = [
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
  ]