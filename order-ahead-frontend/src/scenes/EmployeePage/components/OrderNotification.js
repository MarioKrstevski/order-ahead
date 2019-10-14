import React from "react";
import styled from "styled-components";

const OrderNotificationContent = styled.div`
  width: 100%;
  overflow: auto;
  margin-top: 7px;
  margin-bottom: 7px;
  display: block;
  text-align: left;

  & > div {
    float: right;
    padding: 8px 25px;
    background-color: #39d289;
    color: white;
    width: 95%;
  }
`;

function OrderNotification() {
  return (
    <OrderNotificationContent>
      <div>
        Your order was successfully placed. <br />
        Have a nice meal. Note that you can change the order until 10:00 today.
      </div>
    </OrderNotificationContent>
  );
}
export default OrderNotification;
