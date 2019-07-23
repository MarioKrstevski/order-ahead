import React from "react";

import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import styled from "styled-components";

const MenuWrapper = styled.div``;

const InformationWrapper = styled.div`
  border: 1px solid black;
  text-align: left;
  padding-left:20px;
  margin: 10px 0;
  & span{
    color: #4985bd;
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
        orderMax
        telephone
      }
      ordersNumber
      shifts
    }
  }
`;

function RestaurantInformation({
  ordersNumber,
  restaurant,
  orderMax,
  telephone
}) {
  let number = "+"+telephone.slice(0,3)+" "+telephone.slice(3,5)+" "+telephone.slice(5,8)+" "+telephone.slice(8,11);
  return (
    <InformationWrapper>
      {ordersNumber}/{orderMax} people have ordered today at {restaurant}{" "}
      today. <br />
      For questions and aditional requests call {restaurant} at <span> {number} </span>
    </InformationWrapper>
  );
}
function MenuItems({ foods }) {
  return foods;
}
function OrderDetails() {
  return "hey";
}

function Menu({ selectedRestaurant }) {
  const { data, loading, error, refetch } = useQuery(GET_DAILY_MENU, {
    variables: {
      restaurant: selectedRestaurant,
      date: Date().toString()
    }
  });

  if (loading) return "Loading daily menu...";
  if (error) return `Error daily menu! ${error.message}`;

  const foods = data.getDailyMenu.food.map(food => {
    return (
      <div key={food.name}>
        <span>{food.category}</span>
        <span>{food.name}</span>
        <input type={"radio"} name={food.name} />
      </div>
    );
  });

  return (
    <MenuWrapper>
      <RestaurantInformation
        ordersNumber={data.getDailyMenu.ordersNumber}
        orderMax={data.getDailyMenu.restaurant.orderMax}
        telephone={data.getDailyMenu.restaurant.telephone}
        restaurant={data.getDailyMenu.restaurant.name}
      />
      <MenuItems foods={foods} />
      <OrderDetails />
    </MenuWrapper>
  );
}

export default Menu;
