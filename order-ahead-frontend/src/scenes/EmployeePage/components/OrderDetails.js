import React from "react";
import styled from "styled-components";

const OrderContainer = styled.div`
  margin: 0 20px;
  margin-top: 70px;
  height: 300px;
  border: 2px dashed green;
  position: relative;
  width: 400px;
  text-align: left;
  padding: 20px;
  & b {
    margin-right: 4px;
    display: inline-block;
    width: 120px;
  }
`;

const CancelButton = styled.button`
  position: absolute;
  background-color: #6c8ab4;
  padding: 12px 20px;
  border: none;
  outline: none;
  border-radius: 3px;
  color: white;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);

  &:active {
    background-color: #527cb6;
  }
`;

function OrderDetails({ order, setOrder , refetch}) {
  const handleCancel = () => {
    setOrder(null);
    refetch({
      date: "hehe",
      username: "hehe"
    });
    console.log('this happens')
  };
  const {
    orderId,
    date,
    restaurant,
    atLocation,
    comment,
    food,
    shift,
    user
  } = order;
  return (
    <OrderContainer>
    <h1 style={{margin: 0, marginBottom: 10}}>Your order</h1>
      <div>
        <b>Order number: </b>
        {orderId}
      </div>
      <div>
        <b>For customer: </b>
        {user}
      </div>
      <div>
        <b>Ordered: </b>
        {food.name}
      </div>
      <div>
        <b>Date: </b>
        {date}
      </div>
      <div>
        <b>Shift: </b>
        {shift}
      </div>
      <div>
        <b>Restaurant: </b>
        {restaurant.name}{" "}
      </div>
      <div>
        <b>Location: </b>
        {atLocation ? "on-site" : "take-away"}
      </div>
      <div>
        <b>Comment: </b>
        {comment}
      </div>
      <br />
      <br />
      <CancelButton onClick={handleCancel}> Cancel Order </CancelButton>
    </OrderContainer>
  );
}

export default OrderDetails;
