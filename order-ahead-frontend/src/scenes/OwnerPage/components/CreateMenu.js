import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../../../AuthContext";

const CreateMenuWrapper = styled.div`
  margin-left: 50px;
  background-color: white;
  /* border: 1px solid black; */
  position: relative;
  width: max-content;
  padding: 0 15px 20px;
`;

const OrderButton = styled.button`
  background-color: #6c8ab4;
  margin-top: 50px;
  padding: 12px 20px;
  border: none;
  outline: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;

  &:active {
    background-color: #527cb6;
  }
`;

const GET_MENU = gql`
  query GET_MENU($restaurant: String!) {
    getMenu(restaurant: $restaurant) {
      food {
        name
        category
        price
      }
      restaurant {
        name
        orderMax
        telephone
      }
    }
  }
`;

const CREATE_DAILY_MENU = gql`
  mutation CREATE_DAILY_MENU(
    $foods: [foodInput!]!
    $restaurant: String!
    $date: String!
  ) {
    createDailyMenu(foods: $foods, restaurant: $restaurant, date: $date)
  }
`;
const FoodItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  list-style-type: circle;

  div {
    margin-left: 6px;
  }
`;
const Type = styled.h2`
  padding: 2px 20px;
  border-bottom: 0.5px solid darkgray;
`;

const Category = styled.div`
  text-align: left;
`;

function CreateMenu() {
  const { user } = useContext(AuthContext);
  const tomorrow = new Date().setDate(new Date().getDate() + 1);
  const today = new Date();

  const [selectedFoodItems, setSelectedFoodItems] = useState([]);

  const { data, loading, error, refetch } = useQuery(GET_MENU, {
    variables: {
      restaurant: user.restaurant || "Forza",
      today
    }
  });

  const [createDailyMenu, { loading: mutationLoading }] = useMutation(
    CREATE_DAILY_MENU,
    {
      variables: {
        restaurant: user.restaurant || "Forza",
        tomorrow,
        foods: selectedFoodItems
      }
    }
  );

  const clickHandler = () => {
    setSelectedFoodItems([
      ...selectedFoodItems,
      { name: "Capriccioza", category: "Pizza", price: 300 }
    ]);
    createDailyMenu();
  };

  if (loading) return "Loading menu...";
  if (error) return `Error menu! ${error.message}`;

  console.log("[MenuOwner]:", data);

  const foodItems = data.getMenu.food;

  const categorySorted = {};

  foodItems.forEach(food => {
    if (!categorySorted.hasOwnProperty(food.category)) {
      categorySorted[food.category] = [];
    }

    categorySorted[food.category].push(food);
  });

  const menu = Object.keys(categorySorted).map(category => {
    return (
      <Category key={category}>
        <Type>{category}</Type>
        {categorySorted[category].map(food => {
          return (
            <FoodItem key={food.name}>
              <input type="radio" name={category} />
              <div>{food.name}</div>
            </FoodItem>
          );
        })}
      </Category>
    );
  });

  console.log(categorySorted);

  return (
    <CreateMenuWrapper>
      {menu}

      <OrderButton onClick={clickHandler} disabled={mutationLoading}>
        Create Daily Menu
      </OrderButton>
    </CreateMenuWrapper>
  );
}

export default CreateMenu;
