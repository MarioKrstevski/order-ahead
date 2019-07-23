import React from 'react';

import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import styled from 'styled-components';

const MenuWrapper = styled.div`

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

function RestaurantInformation(){
  return "Info"
}
function MenuItems({foods}){
  return foods
}
function OrderDetails(){
  return "hey"
}

function Menu({selectedRestaurant}){

    const { data, loading, error, refetch } = useQuery(GET_DAILY_MENU, {
        variables: {
          restaurant: selectedRestaurant,
          date: Date().toString()
        }
      });
    
      if (loading) return "Loading daily menu...";
      if (error) return `Error daily menu! ${error.message}`;

      const foods = data.getDailyMenu.food.map(food => {
        return <div key={food.name}>
            <span>{food.category}</span>
            <span>{food.name}</span>
            <input type={"radio"} name={food.name} />
        </div>
    })

    return (
        <MenuWrapper>
            <RestaurantInformation></RestaurantInformation>
            <MenuItems foods={foods}></MenuItems>
            <OrderDetails></OrderDetails>
           
        </MenuWrapper>
    )
}

export default Menu;