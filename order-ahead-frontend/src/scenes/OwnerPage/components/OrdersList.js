import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import moment from "moment";

import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { AuthContext } from "../../../AuthContext";

const Li = styled.li`
  span {
    display: inline-block;
  }
  .food {
    width: 220px;
  }

  .user {
    width: 80px;
  }
  .comment {
  }
`;

const OrderListWrapper = styled.div`
  text-align: left;
  margin-left: 10%;

  h2 {
    text-align: center;
  }
  ul {
    /* margin: 0;
    padding: 0; */
  }
`;

const GET_ORDERS = gql`
  query GET_ORDERS($date: String!, $restaurant: String!) {
    getOrders(date: $date, restaurant: $restaurant) {
      restaurantName
      atLocation
      comment
      foodName
      shift
      user
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

  console.log("USER", user);

  console.log("Restaurant ", user.restaurant);
  const today = moment().format("YYYY-M-D");

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

  // TUJ E KOD
  // const formattedList = {};

  // data.getOrders.forEach( order =>{
  //   console.log(order)
  //   if (!formattedList.hasOwnProperty(order.food.category)) {
  //     formattedList[order.food.category] = [];
  //   }

  //   formattedList[order.food.category].push(order);
  // })

  // console.log(formattedList)

  const toGo = data.getOrders.filter(order => !order.atLocation);
  const toGoList = toGo.map(order => (
    <Li key={order.foodName + order.comment}>
      <span className="food">{order.foodName}</span>
      <span className="user"> [{order.user}]</span>
      <span className="comment">
        ({order.comment ? order.comment : "No comment"})
      </span>
    </Li>
  ));

  const inHouse = data.getOrders.filter(order => order.atLocation);
  const inHouseFirst = inHouse.filter(order => order.shift === "10:00");
  const inHouseSecond = inHouse.filter(order => order.shift === "11:00");
  const inHouseThird = inHouse.filter(order => order.shift === "12:00");

  const inHouseFirstList = inHouseFirst.map(order => (
    <Li key={order.foodName + order.comment}>
      <span className="food">{order.foodName}</span>
      <span className="user"> [{order.user}]</span>
      <span className="comment">
        ({order.comment ? order.comment : "No comment"})
      </span>
    </Li>
  ));

  const inHouseSecondList = inHouseSecond.map(order => (
    <Li key={order.foodName + order.comment}>
      <span className="food">{order.foodName}</span>
      <span className="user"> [{order.user}]</span>
      <span className="comment">
        ({order.comment ? order.comment : "No comment"})
      </span>
    </Li>
  ));

  const inHouseThirdList = inHouseThird.map(order => (
    <Li key={order.foodName + order.comment}>
      <span className="food">{order.foodName}</span>
      <span className="user"> [{order.user}]</span>
      <span className="comment">
        ({order.comment ? order.comment : "No comment"})
      </span>
    </Li>
  ));

  return (
    <OrderListWrapper>
      <h2 style={{ maginLeft: 20 }}> All orders for today: {data.getOrders.length} </h2>

     {!data.getOrders.length ? <p>Nema naracki za denes</p>  : null}

    { toGoList.length ?  <h3>Za Nosenje: </h3> : null}
    { toGoList.length ?  <ul>{toGoList}</ul> : null}

    {(inHouseFirstList.length || inHouseSecondList.length || inHouseThirdList.length ) ? <h3>In-House</h3> : null }

     {inHouseFirstList.length ? <p>10:00 Smena:</p>  : null}
     {inHouseFirstList.length ? <ul>{inHouseFirstList}</ul>  : null}

     {inHouseSecondList.length ?<p>11:00 Smena:</p>  : null}
     {inHouseSecondList.length ? <ul>{inHouseSecondList}</ul>  : null }

     { inHouseThirdList.length ? <p>11:00 Smena:</p>  : null}
     { inHouseThirdList.length ?<ul>{inHouseThirdList}</ul>  : null}
    </OrderListWrapper>
  );
}

export default OrdersList;
