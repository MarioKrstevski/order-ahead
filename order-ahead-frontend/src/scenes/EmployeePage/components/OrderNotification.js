import React from 'react';
import styled from 'styled-components';

const OrderNotificationContent = styled.div`
    background-color: #39d289;
    color: white;
    width: 94vw;
    display: block;
    padding: 8px 25px;
    float: right;
    margin-top: 7px;
    margin-bottom: 7px;
    text-align: left;
`

function OrderNotification(){
    return <OrderNotificationContent>
            Your order was successfully placed. <br/>
            Have a nice meal. Note that you can change the order until 10:00 today.
    </OrderNotificationContent>
}
export default OrderNotification