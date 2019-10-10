import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { AuthContext } from "../../../AuthContext";

const OrderListWrapper = styled.div`
  text-align: left;

  ul {
    /* margin: 0;
    padding: 0; */
  }
`;

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
  if (a.food.category < b.food.category) {
    return 1;
  }
  if (a.food.category > b.food.category) {
    return -1;
  }
  return 0;
}

function OrdersList() {
  const { user } = useContext(AuthContext);

  console.log("Restaurant ", user.restaurant);
  const today = new Date().toUTCString();

  const { data, loading, error } = useQuery(GET_ORDERS, {
    variables: {
      restaurant: user.restaurant,
      date: today
    }
  });

  if (loading) return "Loading orders list ...";
  if (error) return `Error orders list! ${error.message}`;

  console.log("Orders data", data);

  // const list = sortedList.map(order => {
  //   return (
  //     <li key={order.orderId}>
  //       1x {order.food.name} from [{order.food.category}] onsite ={" "}
  //       {order.atLocation} with comment: {order.comment}{" "}
  //     </li>
  //   );
  // });

  // const categorySorted = {};

  // data.getMenu.food.forEach(food => {
  //   if (!categorySorted.hasOwnProperty(food.category)) {
  //     categorySorted[food.category] = [];
  //   }

  //   categorySorted[food.category].push(food);
  // });

  // const menu = Object.keys(categorySorted).map(category => {
  //   return (
  //     <Category key={category}>
  //       <Type>{category}</Type>
  //       <ul>
  //         {categorySorted[category].map(food => {
  //           return (
  //             <FoodItem key={food.name}>
  //               <span className={"food-price"}> ${food.price} </span>
  //               {" --- "}&nbsp;
  //               {food.name}
  //             </FoodItem>
  //           );
  //         })}
  //       </ul>
  //     </Category>
  //   );
  // });
  const formattedList = {};

  data.getOrders.forEach( order =>{
    console.log(order)
    if (!formattedList.hasOwnProperty(order.food.category)) {
      formattedList[order.food.category] = [];
    }

    formattedList[order.food.category].push(order);
  })

  console.log(formattedList)
  return (
    <OrderListWrapper>
      <h1 style={{ maginLeft: 20 }}> All orders for today </h1>
      {/* <ul>{formattedList}</ul> */}
    </OrderListWrapper>
  );
}

export default OrdersList;
