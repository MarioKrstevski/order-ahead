import React, { useContext, useState, useMemo, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import api from "../../services/api";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useQuery } from "react-apollo-hooks";

import RestaurantPicker from "./components/RestaurantPicker";
import OrderNotification from './components/OrderNotification';
import Menu from "./components/Menu";

const GET_RESTAURANTS = gql`
  query GET_RESTAURANTS {
    getRestaurants {
      name
    }
  }
`;

function EmployeePage({ restaurantsQuery }) {
  const { user } = useContext(AuthContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [order, setOrder] = useState(null)

  const { data, error, loading } = useQuery(GET_RESTAURANTS);

  useEffect(() => {
    data && setSelectedRestaurant(data.getRestaurants[0].name);
  }, [data])

  if (loading) return "Loading restaurants...";
  if (error) return `Error restaurants! ${error.message}`;

  const restaurants = data.getRestaurants.map(restaurant => {
    return restaurant.name;
  });

  return (
    <>
      <RestaurantPicker
        restaurants={restaurants}
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
      />
      <OrderNotification ></OrderNotification>
      <Menu selectedRestaurant={selectedRestaurant} />
      
    </>
  );
}
export default EmployeePage;
