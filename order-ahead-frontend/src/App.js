import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import Login  from './scenes/Login/Login';
import CompanyLunch from './scenes/CompanyLunch/CompanyLunch';
import Home from './scenes/Home/Home';



const AppWrapper = styled.div`
   text-align: center;
   display: grid;
   box-sizing:border-box;
   height: 100vh;
   grid-template-rows: 150px 1fr;
   border: 1px solid yellow;
`
const Header = styled.div`
  border: 1px solid greenyellow;
  background-color: #eee;
`
const RouteView = styled.div`
  background-color: #dfdfdf;
  & > *{
    height: 100%;
    box-sizing:border-box;
    border: 1px solid black;
  }
`
const MainMenu = () => {

  return(<div>
    <Link to="/home">
      <button>Home</button>
    </Link>
    <Link to="/companylunch">
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
  </div>)

}
class App extends Component {
  render() {
    return (
      <Router>
        <AppWrapper>
          <Header >
              <h1 >Welcome to React</h1>
              <MainMenu />
          </Header>
            <RouteView>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/companylunch" component={CompanyLunch} />
              {/* <Route exact path="/profile" component={Profile} /> */}
              {/* <Route exact path="/admin" component={Admin} /> */}
              {/* <Route component={Login} /> Returns to login if we access unexsisting routes */}
            </RouteView>
        </AppWrapper>
      </Router>
    );
  }
}

export default App;
