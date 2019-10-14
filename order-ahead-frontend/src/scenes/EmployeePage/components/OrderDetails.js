import React, { useContext } from "react";
import styled from "styled-components";
import moment from 'moment'

import gql from "graphql-tag";

import { useQuery, useMutation } from "react-apollo-hooks";
import { AuthContext } from "../../../AuthContext";


const OrderContainer = styled.div`
  margin: 0 20px;
  margin-top: 70px;
  height: 340px;
  border: 2px dashed green;
  position: relative;
  width:300px;
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

const CANCEL_ORDER = gql`
mutation CANCEL_ORDER(
  $date: String!
  $user: String!
) {
  cancelOrder(
    date: $date
    user: $user
  ) {
    date
    restaurantName
    atLocation
    comment
    foodName
    shift
    user
  }
}
`

function OrderDetails({ order , refetchOrder}) {

  const [cancelOrder, { data }] = useMutation(CANCEL_ORDER);
  const { user } = useContext(AuthContext)
    const dateNow = moment().format("YYYY-M-D-HH-mm");
  const handleCancel = async () => {
    await cancelOrder({ variables : {
      date: dateNow,
      user: user.name
    }})

    refetchOrder();
  };
  
  const {
    date,
    restaurantName,
    atLocation,
    comment,
    foodName,
    shift,
  } = order;
  
  const time = date.slice(11,16).split('-').join(":");
  return (
    <OrderContainer>
    <h1 style={{margin: 0, marginBottom: 10}}>Your order</h1>
      <div>
        <b>Customer: </b>
        {user.name}
      </div>
      <div>
        <b>Ordered: </b>
        {foodName}
      </div>
      <div>
        <b>Date: </b>
        {date.slice(0,10)}
      </div>
      <div>
        <b>Time: </b>
        {time}
      </div>
      <div>
        <b>Shift: </b>
        {shift}
      </div>
      <div>
        <b>Restaurant: </b>
        {restaurantName}{" "}
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
