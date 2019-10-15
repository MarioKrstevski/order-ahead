import React, { useContext } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import moment from 'moment'
import { AuthContext } from "../../../AuthContext";

const MenuWrapper = styled.div`
  margin: 0 auto;
  background-color: white;
  /* border: 1px solid black; */
  position: relative;
  width: max-content;
  padding: 0 15px 20px;
`;

const GET_MENU = gql`
query GET_MENU($restaurant: String!) {
  getMenu(restaurant: $restaurant) {
      food {
        name
        category
        price
      }
      restaurant
    }
  }
`;
const FoodItem = styled.li`
  margin-right: 10px;
  list-style-type: circle;

  .food-price {
    display: inline-block;
    min-width: 46px;
  }
`;
const Type = styled.h2`
  padding: 2px 20px;
  border-bottom: 0.5px solid darkgray;
`;

const Category = styled.div`
  text-align: left;
  ul {
    /* margin: 0;
    padding: 0; */
  }
`;

function Menu() {
  const { user } = useContext(AuthContext);

  const { data, loading, error, refetch } = useQuery(GET_MENU, {
    variables: {
      restaurant: user.restaurant || "Forza",
    }
  });

  if (loading) return "Loading menu...";
  if (error) return `Error menu! ${error.message}`;

  console.log("[MenuOwner]:", data);


  const categorySorted = {};

  data.getMenu.food.forEach(food => {
    if (!categorySorted.hasOwnProperty(food.category)) {
      categorySorted[food.category] = [];
    }

    categorySorted[food.category].push(food);
  });

  const menu = Object.keys(categorySorted).map(category => {
    return (
      <Category key={category}>
        <Type>{category}</Type>
        <ul>
          {categorySorted[category].map(food => {
            return (
              <FoodItem key={food.name}>
                <span className={"food-price"}> ${food.price} </span>
                {" --- "}&nbsp;
                {food.name}
              </FoodItem>
            );
          })}
        </ul>
      </Category>
    );
  });

  console.log(categorySorted);

  return <MenuWrapper>{menu}</MenuWrapper>;
}

export default Menu;
