import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import api from "../../services/api";

import gql from "graphql-tag";
import { Query } from "react-apollo";

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

function EmployeePage() {
  const { user } = useContext(AuthContext);
  const [dailyMenu, setDailyMenu] = useState(null);
  const [menu, setMenu] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  return (
    <Query query={GET_RESTAURANTS}>
      {({ loading, error, data, refetch }) => {
        if (loading) return "Loading restaurants...";
        if (error) return `Error restaurants! ${error.message}`;

        const firstRestaurant = data.getRestaurants[0].name;
        const restaurants = data.getRestaurants.map((restaurant) => {
          return restaurant.name
        });

        setSelectedRestaurant(firstRestaurant);

        return (
          <Query
            query={GET_DAILY_MENU}
            variables={{
              restaurant: selectedRestaurant,
              date: new Date().toISOString()
            }}
          >
            {({ loading, error, data, refetch }) => {
              if (loading) return "Loading daily menu...";
              if (error) return `Error daily menu! ${error.message}`;

              console.log("DAILY MENU DATA :", data);

              return (
                <>
                  <RestaurantPicker
                    restaurants={restaurants}
                    setSelectedRestaurant={setSelectedRestaurant}
                    refetch={refetch}
                  />
                  <Menu dailyMenu={data.getDailyMenu} selectedRestaurant={selectedRestaurant} />
                </>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
}
export default EmployeePage;
