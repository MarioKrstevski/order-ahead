import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";

const GET_DAILY_MENU = gql`
  query GET_DAILY_MENU($date: String!, $restaurant: String!) {
    getDailyMenu(date: $date, restaurant: $restaurant) {
      food {
        name
        category
      }
      restaurant {
        name
        location
        orderMax
        telephone
      }
      ordersNumber
      date
      shifts
    }
  }
`;

function DailyMenu({ user }) {
  console.log("USER & REST", user, user.restaurant);
  const dateNow = moment()
    .format("YYYY-M-D-HH-mm")
    .slice(0, 10);
  const [dailyMenu, setDailyMenu] = useState(null);

  const { data, loading, error } = useQuery(GET_DAILY_MENU, {
    variables: {
      restaurant: user.restaurant,
      date: dateNow
    }
  });

  useEffect(() => {
    data && setDailyMenu(data.getDailyMenu);
  }, [data]);

  if (loading) return "Loading daily menu...";
  if (error) return `Error daily menu! ${error.message}`;

  if (!dailyMenu) {
    return "There is no menu for today :(";
  }

  console.log("DDD MENU", dailyMenu);
  return <DailyMenuSelection food={dailyMenu.food} />;
}

const DailyMenuWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  text-align: left;
  h2 {
   margin-left: 13px;
  }
  .inner {
    display: inline-block;
    margin-left:10px

  }

  .first {
    width: 80px;
  }
`;
function DailyMenuSelection({ food }) {
  const foodList = food.map(choice => {
    return (
      <li key={choice.name}>
        <div className="inner first">{choice.category}</div> ----
        <div className="inner">{choice.name}</div>
      </li>
    );
  });
  return (
    <DailyMenuWrapper>
      <h2>The Menu For Today is:</h2>
      <ol>{foodList}</ol>
    </DailyMenuWrapper>
  );
}

export default DailyMenu;
