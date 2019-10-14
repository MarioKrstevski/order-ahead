import React from "react";
import styled from "styled-components";

const Button = styled.button`
  /* border: 1px solid black; */
  background-color: ${props => (props.selected ? "#ffffff" : "#e5e5e5")};
  padding: 5px 8px;
  border:none;
  outline: none;
  margin-right:1px;

`;

const HeaderWrapper = styled.div`
    display: flex;
    height: 45px;
    justify-content:flex-start;
    align-items:center;
    background-color: #527cb6;
    color: white;

    & span {
        margin-left:15px;
        margin-right:35px;
        
        & b{
            width:80px;
            display:inline-block;
        }
    }
`;

function RestaurantPicker({
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant,
}) {

  const buttons = restaurants.map(restaurant => {
    const selected = restaurant === selectedRestaurant ? true : false;

    return (
      <Button
        selected={selected}
        key={restaurant}
        onClick={() => setSelectedRestaurant(restaurant)}
      >
        {restaurant}
      </Button>
    );
  });
  return <HeaderWrapper>
   <span>Select Restaurants: <b>{selectedRestaurant }</b>  </span>
   {buttons}
  </HeaderWrapper>;
}

export default RestaurantPicker;
