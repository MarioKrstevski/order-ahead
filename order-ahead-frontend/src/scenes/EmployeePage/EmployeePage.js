import React, { useContext, useState, useMemo, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import moment from 'moment'
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

const GET_ORDER = gql`
  query GET_ORDER($username: String!, $date: String!){
    getOrder(username: $username, date: $date){
      orderId
      date
      restaurant {
        name
      }
      atLocation
      comment
      food {
        name
      }
      shift
      user
    }
  }
`

function EmployeePage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [order, setOrder] = useState(null)

  const { user } = useContext(AuthContext)
  const today = moment().format('YYYY-M-D')

  console.log('today',today)

  const orderQuery = useQuery(GET_ORDER, {
    variables: {
      date: today,
      username: user.name
    }
  })
  const { data, error, loading } = useQuery(GET_RESTAURANTS);

  useEffect(() => {
    data && setSelectedRestaurant(data.getRestaurants[0].name);
    orderQuery.data && setOrder(orderQuery.data.getOrder);
  }, [data, order, orderQuery])

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

      { order &&  <OrderNotification orderQuery={orderQuery} /> }

      <FlexboxWrapper>
        <Menu selectedRestaurant={selectedRestaurant} order={order} setOrder={setOrder} refetch={orderQuery.refetch}/>
        { order && <OrderDetails order={order} setOrder={setOrder} refetch={orderQuery.refetch} />}
      </FlexboxWrapper>
      
    </>
  );
}
export default EmployeePage;
