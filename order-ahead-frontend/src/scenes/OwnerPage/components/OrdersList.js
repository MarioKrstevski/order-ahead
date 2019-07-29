import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { AuthContext } from "../../../AuthContext";

const OrderListWrapper = styled.div``;

const GET_ORDERS = gql`
  query GET_ORDERS($date: String!, $restaurant: String!) {
    getOrders(date: $date, restaurant: $restaurant) {
      orderId
      atLocation
      comment
      food {
        name
        category
      }
      shift
    }
  }
`;

function sortByCategory(a, b) {
    if(a.food.category < b.food.category) { return 1; }
    if(a.food.category > b.food.category) { return -1; }
    return 0;
  }

function OrdersList() {
  const { user } = useContext(AuthContext);

  console.log('Restaurant ', user.restaurant);

  const { data, loading, error } = useQuery(GET_ORDERS, {
    variables: {
      restaurant: user.restaurant,
      date: Date().toString()
    }
  });

  if (loading) return "Loading orders list ...";
  if (error) return `Error orders list! ${error.message}`;

  console.log("Orders data", data);

  
  const sortedList = data.getOrders.sort(sortByCategory)
  const list = sortedList.map(order => {
      return <p key={order.orderId}> 1x {order.food.name} from [{order.food.category}] onsite = {order.atLocation} with comment: {order.comment} </p>
  })

  return (
    <OrderListWrapper>
      <h1> All orders for today </h1>
      {list}
    </OrderListWrapper>
  );
}

export default OrdersList;
