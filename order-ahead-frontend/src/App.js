import React, { useState } from "react";
import { Link, Router } from "@reach/router";

import "./App.css";
import styled from "styled-components";

import Login from "./scenes/Login/Login";
import OwnerPage from "./scenes/OwnerPage/OwnerPage";
import EmployeePage from "./scenes/EmployeePage/EmployeePage";

import { AuthContext } from "./AuthContext";

const AppWrapper = styled.div`
  text-align: center;
  display: grid;
  box-sizing: border-box;
  height: 100vh;
  grid-template-rows: 150px 1fr;
  border: 1px solid yellow;
`;
const Header = styled.div`
  border: 1px solid greenyellow;
  background-color: #eee;
`;
const RouteView = styled.div`
  background-color: #dfdfdf;
  & > * {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid black;
  }
`;
const MainMenu = () => {
  return (
    <div>
      <Link to="/foods">
        <button>Home</button>
      </Link>
      <Link to="/dailymenu">
        <button>Company Lunch</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

const NotFound = () => <p>Sorry, nothing here</p>;

export default function App() {
  
  const [user, setUser] = useState(null);
  console.log("[App.js]  USER from CONTEXT:", user);

  return (
    <AppWrapper>
      <AuthContext.Provider value={{ user, setUser }}>
        <Header>
          <h1>Welcome to React</h1>
          <MainMenu />
        </Header>
        <RouteView>
          <Router>
            <EmployeePage path="/dailymenu" />
            <Login path="/" />
            <OwnerPage path="/foods" />
            <NotFound default />
          </Router>
        </RouteView>
      </AuthContext.Provider>
    </AppWrapper>
  );
}
