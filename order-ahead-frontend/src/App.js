import React, { useState, useContext } from "react";
import { Link, Router } from "@reach/router";
import "./App.css";
import styled from "styled-components";
import Login from "./scenes/Login/Login";
import OwnerPage from "./scenes/OwnerPage/OwnerPage";
import EmployeePage from "./scenes/EmployeePage/EmployeePage";

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
      {/* <Link to="/profile">
      <button>Profile</button>
    </Link>
    <Link to="/admin">
      <button>Admin</button>
    </Link> */}
    </div>
  );
};
function App() {

  const Context = useContext(null));


  const [user, setUser] = useState({});

  const setUserAuthenticated = user => {
    setUser(user);
  };

  const NotFound = () => <p>Sorry, nothing here</p>

  return (
    <Router>
      <AppWrapper >
        <Header>
          <h1>Welcome to React</h1>
          <MainMenu />
        </Header>
        <RouteView>
            <NotFound default />
            <EmployeePage path="/dailymenu" />
            <Login  path="/"/>
            <OwnerPage  path="/foods" />
        </RouteView>
      </AppWrapper>
    </Router>
  );
}

export default App;
