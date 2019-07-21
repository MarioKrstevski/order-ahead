const { gql } = require("apollo-server");

export default gql`

    type Restaurant {
        name: String!
        location: String!
    }

    type User {
        username: String,
        password:String,
        name: String,
        token: String,
        role: String,
    }

    type Order {
        orderId: Int,
        date: String,
        restaurant: Restaurant,
        atLocation: Boolean,
        comment: String,
        foodChoice: Food,
        shift: String
        user: String
    }

    type Food {

        name: String,
        category: String,
        price: Int
    }

    type Menu {
        food: [Food]
        restaurant: Restaurant
    }

    type DailyMenu {
        food: [Food]
        restaurant: Restaurant
        ordersNumber: Int
        date: String
    }

    type Query {
        getRestaurants: [Restaurant]
        getOrder(username: String!, date: String!): Order
        
        getDailyMenu(date: String!, restaurant: String!): DailyMenu

        getOrders(date: String!, restaurant: String!): [Order]
        getMenu(restaurant: String!): Menu
    }



    type Mutation {
        makeOrder(foodName: String!, quantity: Int!, date: String!, restaurantName: String!, atLocation: Boolean!, comment: String!, shift: String!, user: String!): Order
        cancelOrder(date: String!): Boolean
        updateOrder: Order

        createDailyMenu(foods:[foodInput!]!, restaurantName: String!, date: String!): DailyMenu
        updateDailyMenu(foods:[foodInput!]!, restaurantName: String!, date: String!): DailyMenu
        addFood(foodname: String!, category: String!, price: Int!, restaurantName: String!): Food
        deleteFood(foodName: String!, restaurantName: String!): Food
        updateFood(foodName: String!, newFoodName: String!, newPrice: Int!, restaurantName: String!): Food
    }

    input foodInput {
        name: String,
        category: String,
        price: Int
    }
`;
