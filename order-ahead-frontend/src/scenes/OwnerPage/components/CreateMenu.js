import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../../../AuthContext";
import moment from "moment";

const CreateMenuWrapper = styled.div`
  margin-left: 50px;
  background-color: white;
  /* border: 1px solid black; */
  position: relative;
  width: max-content;
  padding: 0 15px 20px;
`;

const OrderButton = styled.button`
  display: block;
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
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: coral;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  ${props => (props.active ? "background-color: orange" : null)}
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

const UPSERT_DAILY_MENU = gql`
  mutation UPSERT_DAILY_MENU(
    $foods: [foodInput!]!
    $restaurant: String!
    $date: String!
  ) {
    upsertDailyMenu(foods: $foods, restaurant: $restaurant, date: $date)
  }
`;

function CreateMenu() {
  const { user } = useContext(AuthContext);
  const date = {
    today: moment()
      .format("YYYY-M-D-HH-mm")
      .slice(0, 10),
    tomorrow: moment()
      .add(1, "day")
      .format("YYYY-M-D-HH-mm")
      .slice(0, 10)
  };

  const [selectedFoodItems, setSelectedFoodItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("tomorrow");
  const [upsertDailyMenu, { loading: mutationLoading }] = useMutation(
    UPSERT_DAILY_MENU,
    {
      variables: {
        restaurant: user.restaurant || "Forza",
        date: date.selectedDate,
        foods: selectedFoodItems
      }
    }
  );

  const { data, loading, error, refetch } = useQuery(GET_MENU, {
    variables: {
      restaurant: user.restaurant || "Forza"
    }
  });

  const clickHandler = () => {
    setSelectedFoodItems([
      ...selectedFoodItems,
      { name: "Capriccioza", category: "Pizza", price: 300 }
    ]);
    upsertDailyMenu();
  };

  // let loading,error,data;

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
      <Button
        onClick={() => setSelectedDate("today")}
        active={selectedDate === "today"}
      >
        Update for Today
      </Button>
      <Button
        onClick={() => setSelectedDate("tomorrow")}
        active={selectedDate === "tomorrow"}
      >
        Create for Tomorrow
      </Button>

      <OrderButton onClick={clickHandler} disabled={mutationLoading}>
        Create Daily Menu
      </OrderButton>
    </CreateMenuWrapper>
  );
}

export default CreateMenu;
