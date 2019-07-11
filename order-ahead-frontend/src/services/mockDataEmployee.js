export default {
  getDailyMenus: async () => {
    return {
      restaurants: [
        {
          name: "Forza",
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
          name: "Enriko",
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
    };
  },
  getMyOrder: async () => {
    return {
      orderId: 5,
      date: "23-04-2019-23-12",  
      restaurant: "Forza",
      atLocation: false,
      comment: "Bez piperki na picata",
      foodChoice: "Peperoni Pizza",
      shift: "10:00",
    };
  }
};
