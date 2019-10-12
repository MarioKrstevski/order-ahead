/* eslint-disable no-undef */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthContext";

import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";

import styled from "styled-components";

const MenuWrapper = styled.div`
  position: relative;
  min-width: fit-content;
  width: 100%;
  /* border: 1px solid red; */
  height: 100%;
  text-align: left;
`;
const H3 = styled.h3`
  margin: 10px 0;
  padding-bottom: 8px;
  padding-left: 30px;
  border-bottom: 1px solid black;
`;
const InformationWrapper = styled.div`
  /* border: 1px solid black; */
  text-align: left;
  padding-left: 50px;
  margin: 10px 0;
  & span {
    color: #4985bd;
  }
`;
const FoodListContainer = styled.div`
  height: 100%;
  /* border: 1px solid black; */
  & > div:nth-child(even) {
    background-color: #e5e5e5;
  }
`;
const FoodItem = styled.div`
  font-size: 19px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  height: 34px;
  padding-left: 20px;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  & > * {
    /* border: 1px solid pink; */
  }

  .category {
    min-width: 25%;
    min-width: 110px;
    padding-left: 10px;
  }
`;

const OtherDetailsWrapper = styled.div`
  padding-left: 20px;
  & > * {
    margin-bottom: 5px;
  }
  span {
    display: inline-block;
    min-width: 100px;
  }
  input {
    display: inline;
  }
  .textareaContainer {
    display: flex;
    align-items: top;
  }
`;

const OrderButton = styled.button`
  position: absolute;
  background-color: #6c8ab4;
  left: 380px;
  bottom: 70px;
  padding: 12px 20px;
  border: none;
  outline: none;
  border-radius: 3px;
  color: white;

  &:active {
    background-color: #527cb6;
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
    }
  }
`;

const MAKE_ORDER = gql`
  mutation MAKE_ORDER(
    $foodName: String!
    $quantity: Int!
    $date: String!
    $restaurantName: String!
    $atLocation: Boolean!
    $comment: String!
    $shift: String!
    $user: String!
  ) {
    makeOrder(
      foodName: $foodName
      quantity: $quantity
      date: $date
      restaurantName: $restaurantName
      atLocation: $atLocation
      comment: $comment
      shift: $shift
      user: $user
    ) {
      user
    }
  }
`;

function RestaurantInformation({
  ordersNumber,
  restaurant,
  orderMax,
  telephone
}) {
  let number =
    "+" +
    telephone.slice(0, 3) +
    " " +
    telephone.slice(3, 5) +
    " " +
    telephone.slice(5, 8) +
    " " +
    telephone.slice(8, 11);
  return (
    <InformationWrapper>
      {ordersNumber}/{orderMax} people have ordered today at {restaurant} today.
      <br />
      For questions and aditional requests call {restaurant} at
      <span> {number} </span>
    </InformationWrapper>
  );
}
function MenuItems({ foods, selectFood }) {

  const onFoodChanged = (event, food) => {
    selectFood(food);
  };
  const foodList = foods.map(food => {
    return (
      <FoodItem key={food.name}>
        <input
          type="radio"
          name="food"
          value={food.name}
          onChange={e => onFoodChanged(e, food)}
        />
        <div className="category">{food.category}</div>
        <div>{food.name}</div>
      </FoodItem>
    );
  });
  return <FoodListContainer>{foodList}</FoodListContainer>;
}

function OtherDetails({ restaurant, selectedDetails, changeDetails }) {

  const  {user, date, location, shift } = selectedDetails

  const handleChanges = (e) => {
    console.log("Name:" , e.target.name);
    console.log("Value:" , e.target.value);
    changeDetails({ ...selectedDetails, [e.target.name]:e.target.value})
  }
  return (
    <OtherDetailsWrapper>
      <div>
        <span>Who:</span> {user.name}{" "}
      </div>
      <div>
        <span>Date:</span> {date}
      </div>
      <div  >
        <span>Location:</span>
        <input type="radio" name="location" value="onsight" defaultChecked={location === "onsight"}  onChange={ (e) => handleChanges(e)} /> {restaurant}
        <input type="radio" name="location" value="takeaway"  onChange={ (e) => handleChanges(e)} /> take-away
      </div>
      <div  >
        <span>Shift:</span>
        <input type="radio" name="shiftTime" value="10:00" defaultChecked={shift === "10:00"}  onChange={ (e) => handleChanges(e)} /> 10:00
        <input type="radio" name="shiftTime" value="10:30"  onChange={ (e) => handleChanges(e)} /> 10:30
      </div>
      <div className="textareaContainer">
        <span>Comment:</span>
        <textarea rows="4" cols="30" name="comment" onChange={ (e) => handleChanges(e) }/>
      </div>
    </OtherDetailsWrapper>
  );
}

function OrderContent({foods, restaurant, order, setOrder, refetchOrder}) {
  const [selectedFood, setSelectedFood] = useState(null);
  const { user } = useContext(AuthContext);
  const dateNow = new Date().toLocaleDateString();

  const [selectedDetails, setSelectedDetails] = useState({
    user: user.name,
    date: dateNow,
    location: "onsight",
    shiftTime: "10:00",
    comment: ""
  });

  const selectFood = food => {
    setSelectedFood(food);
  };

  const [makeOrder, { data: makeOrderData }] = useMutation(MAKE_ORDER);

  const handleOrder = () => {

    console.log('sFood', selectedFood)

    selectedFood && makeOrder({
      variables: {
        foodName: selectedFood.name,
        quantity: 1,
        date: selectedDetails.date,
        restaurantName: restaurant,
        atLocation: selectedDetails === "onsight",
        comment: selectedDetails.comment,
        shift: selectedDetails.shiftTime,
        user:selectedDetails.user
      }
    });

    console.log("Order: ", {
      variables: {
        foodName: selectedFood.name,
        quantity: 1,
        date: selectedDetails.date,
        restaurantName: restaurant,
        atLocation: selectedDetails === "onsight",
        comment: selectedDetails.comment,
        shift: selectedDetails.shiftTime,
        user:selectedDetails.user
      }
    })

    setOrder(null);
    refetchOrder({ date: "hehe", username: "hehe" });
  };

  return (
    <>
      <H3>Menu</H3>
      <MenuItems
        foods={foods}
        selectedFood={selectedFood}
        selectFood={selectFood}
      />
      <H3>Details</H3>
      <OtherDetails selectedDetails={selectedDetails} changeDetails={setSelectedDetails} restaurant={restaurant} />
      <OrderButton onClick={handleOrder}>
        {order ? "Update Order" : "Order"}
      </OrderButton>
    </>
  );
}

function Menu({ selectedRestaurant, order, setOrder, refetch: refetchOrder }) {

  const { data, loading, error, refetch } = useQuery(GET_DAILY_MENU, {
    variables: {
      restaurant: selectedRestaurant,
      date: Date().toString()
    }
  });

 

   

  if (loading) return "Loading daily menu...";
  if (error) return `Error daily menu! ${error.message}`;

  const foods = data.getDailyMenu.food;

  return (
    <MenuWrapper>
      <RestaurantInformation
        ordersNumber={data.getDailyMenu.ordersNumber}
        orderMax={data.getDailyMenu.restaurant.orderMax}
        telephone={data.getDailyMenu.restaurant.telephone}
        restaurant={data.getDailyMenu.restaurant.name}
      />
      <OrderContent
        foods={foods}
        restaurant={data.getDailyMenu.restaurant.name}
        order={order}
        refetchOrder={refetchOrder}
        setOrder={setOrder}
       />

      
    </MenuWrapper>
  );
}

export default Menu;
