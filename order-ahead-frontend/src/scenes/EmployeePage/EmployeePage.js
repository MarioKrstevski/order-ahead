import React, { useContext, useState, useMemo, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import api from "../../services/api";
import styled from 'styled-components';

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useQuery } from "react-apollo-hooks";

import RestaurantPicker from "./components/RestaurantPicker";
import OrderNotification from './components/OrderNotification';
import OrderDetails from './components/OrderDetails';
import Menu from "./components/Menu";

const FlexboxWrapper = styled.div`
  display: flex;
  flex-wrap:nowrap;
   /* justify-content:space-between; */
`


const GET_RESTAURANTS = gql`
  query GET_RESTAURANTS {
    getRestaurants {
      name
    }
  }
`;

function EmployeePage({ restaurantsQuery }) {
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

      { order &&  <OrderNotification /> }

      <FlexboxWrapper>
        <Menu selectedRestaurant={selectedRestaurant} order={order} setOrder={setOrder}/>
        { order && <OrderDetails order={order} setOrder={setOrder}  />}
      </FlexboxWrapper>
      
    </>
  );
}
export default EmployeePage;
