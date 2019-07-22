import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import api from "../../services/api";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useQuery } from "react-apollo-hooks";

import RestaurantPicker from "./components/RestaurantPicker";
import Menu from "./components/Menu";

const GET_RESTAURANTS = gql`
  query GET_RESTAURANTS {
    getRestaurants {
      name
    }
  }
`;

const GET_DAILY_MENU = gql`
  query GET_DAILY_MENU($date: String!, $restaurant: String!) {
    getDailyMenu(date: $date, restaurant: $restaurant) {
      food {
        name
        category
      }
      restaurant {
        name
      }
      ordersNumber
      shifts
    }
  }
`;

function GetRestaurantsQueryWrapped(){
  const { data, error, loading } = useQuery(GET_RESTAURANTS);
  if (loading) return "Loading restaurants...";
  if (error) return `Error restaurants! ${error.message}`;

  return <EmployeePage restaurantsQuery={data}></EmployeePage>

}

function EmployeePage({restaurantsQuery}) {
  const { user } = useContext(AuthContext);
  const [dailyMenu, setDailyMenu] = useState(null);
  const [menu, setMenu] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const {data, loading, error, refetch} = useQuery(GET_DAILY_MENU, { variables : {restaurant: restaurantsQuery.getRestaurants[0].name, date: Date().toString()}});

  console.log("RESTAURANTS: ",  restaurants);
  console.log("DAILY MENU: ", data);

  if (loading) return "Loading daily menu...";
  if (error) return `Error daily menu! ${error.message}`;

  const restaurants = restaurantsQuery.getRestaurants.map((restaurant) => {
    return restaurant.name
  });

  return (
    <>
      <RestaurantPicker
        restaurants={restaurants}
        setSelectedRestaurant={setSelectedRestaurant}
        refetch={refetch}
      />
      <Menu
        dailyMenu={data.getDailyMenu}
        selectedRestaurant={selectedRestaurant}
      />
    </>
  );
}
export default GetRestaurantsQueryWrapped;
