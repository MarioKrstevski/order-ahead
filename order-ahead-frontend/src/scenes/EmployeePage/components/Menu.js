import React, { useContext } from "react";
import { AuthContext } from "../../../AuthContext";

import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import styled from "styled-components";

const MenuWrapper = styled.div`
 position: relative;
  min-width: fit-content;
  width: 100%;
  border: 1px solid red;
  height: 100%;
  text-align: left;
`;
const H3 = styled.h3`
  margin: 0;
  padding-left: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
`;
const InformationWrapper = styled.div`
  border: 1px solid black;
  text-align: left;
  padding-left: 20px;
  margin: 10px 0;
  & span {
    color: #4985bd;
  }
`;
const FoodListContainer = styled.div`
  height: 100%;
  border: 1px solid black;
  & > div:nth-child(even) {
    background-color: #e5e5e5;
  }
`;
const FoodItem = styled.div`
  height: 45px;
  padding-left: 20px;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  &>*{
    border: 1px solid pink;
  }

  .category{
    min-width:25%;
    min-width: 110px;
    padding-left: 10px;
  }
`;

const OtherDetailsWrapper = styled.div`
padding-left: 20px;
  &>*{
    margin-bottom:5px;
  }
  span{
    display: inline-block;
    min-width: 100px;
  }
  input{
    display: inline;
  }
  .textareaContainer{
    display:flex;
    align-items: top;
  }
`

const OrderButton = styled.button`
  position: absolute;
  background-color: #6c8ab4;
  right: 30px;
  bottom: 50px;
  padding: 12px 20px ;
  border: none;
  outline: none;
  border-radius: 3px;
  color: white;

  &:active{
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
      {ordersNumber}/{orderMax} people have ordered today at {restaurant} today.{" "}
      <br />
      For questions and aditional requests call {restaurant} at{" "}
      <span> {number} </span>
    </InformationWrapper>
  );
}
function MenuItems({ foods }) {
  const foodList = foods.map(food => {
    return (
      <FoodItem key={food.name}>
        <input type="radio" name="food" />
        <div className="category">{food.category}</div>
        <div>{food.name}</div>
      </FoodItem>
    );
  });
  return <FoodListContainer>{foodList}</FoodListContainer>;
}

function OtherDetails({restaurant}){
  const { user } = useContext(AuthContext);
  return <OtherDetailsWrapper>
      <div><span>Who:</span> {user.name} </div>
      <div><span>Date:</span> {new Date().toLocaleDateString()}</div>
      <div><span>Location:</span>
        <input type="radio" name="location" defaultChecked /> {restaurant}
        <input type="radio" name="location" /> take-away
      </div>
      <div className="textareaContainer"><span>Comment:</span> 
            <textarea rows="3" cols="24" ></textarea>
      </div>

  </OtherDetailsWrapper>
}

function Menu({ selectedRestaurant, order }) {
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
      <H3>Menu</H3>
      <MenuItems foods={foods} />

      <H3>Details</H3>
      <OtherDetails restaurant={data.getDailyMenu.restaurant.name}/>

      
      <OrderButton>
        {order ? 'Update Order' : 'Order'}
      </OrderButton>

    </MenuWrapper>
  );
}

export default Menu;
