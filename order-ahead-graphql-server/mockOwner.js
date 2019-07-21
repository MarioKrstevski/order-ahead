
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
  