import React, { useState } from "react";
import { Link, Router, Location } from "@reach/router";
import ProtectedRoute from "./ProtectedRoute";

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
  grid-template-rows: max-content 1fr;
  /* border: 1px solid yellow; */
`;
const Header = styled.div`
  /* border: 1px solid greenyellow; */
  background-color: #eee;
`;
const RouteView = styled.div`
  & > * {
    height: 100%;
    box-sizing: border-box;
    /* border: 1px solid black; */
  }
`;
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; // horizontal alignment
  align-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #965418;
  background-color: #83D9C8;

  img {
    width: 36%;
    height: 320px;
    background-size: cover;
  }

  h2{
    margin-top:0;
  }
  p {
    padding: 0 20%;
  }
`;

const MainMenu = ({ logout }) => {
  return (
    <div>
      <Link to="/foods">
        <button>Owner</button>
      </Link>
      <Link to="/dailymenu">
        <button>Employee</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

const NotFound = () => (
  <NotFoundContainer>
    <div>
      <img src={require("./resources/404.png")} alt="404" />
    </div>
    <h2> Caution! This Page is Cordoned Off</h2>
    <p>
      The earthquake was not good to the bike lane on your way to work. A large
      gap in the pavement (too big to be called a pothole) had swallowed three
      oblivious bikers whole. So the city had put up two pylons and yellow
      caution tape. Pretty frustrating for you given your propensity to do 360
      jumps over the gap.
    </p>
  </NotFoundContainer>
);

export default function App() {
  const logout = () => {
    setUser({
      name: null,
      token: null,
      role: "visitor",
      isAuthenticated: false
    });
  };
  const [user, setUser] = useState({
    name: "Stefan",
    token: "12345678",
    role: "owner",
    restaurant: "Forza",
    isAuthenticated: true
  });

  // name: null,
  // token: null,
  // role: "visitor",
  // isAuthenticated: false

  console.log("[App.js]  USER from CONTEXT:", user);

  return (
    <AppWrapper>
      <Location>
        {({ location }) => (
          <AuthContext.Provider value={{ user, setUser }}>
            <Header>
              <MainMenu logout={logout} />
            </Header>
            <RouteView>
              <Router>
                <ProtectedRoute
                  path="/dailymenu"
                  component={EmployeePage}
                  allowed={["employee"]}
                  authenticatedOnly
                  prevLocation={location}
                />
                <ProtectedRoute
                  path="/"
                  component={Login}
                  allowed={["all"]}
                  authenticatedOnly={false}
                  prevLocation={location}
                />
                <ProtectedRoute
                  path="/foods"
                  component={OwnerPage}
                  allowed={["owner"]}
                  authenticatedOnly
                  prevLocation={location}
                />
                <NotFound default />
              </Router>
            </RouteView>
          </AuthContext.Provider>
        )}
      </Location>
    </AppWrapper>
  );
}
