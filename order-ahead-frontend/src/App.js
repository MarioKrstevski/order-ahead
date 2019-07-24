import React, { useState } from "react";
import {
  Link,
  Router,
  Location
} from "@reach/router";
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

const MainMenu = ({ logout }) => {
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
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

const NotFound = () => <p>Sorry, nothing here</p>;

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
    name: 'Mario',
    token: '123456',
    role: "employee",
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
