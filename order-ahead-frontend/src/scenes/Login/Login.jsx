import React, { Component } from 'react';
import './login.styles.scss';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom'

const LoginWrapper = styled.div`
    /* border: 1px solid black; */
`;
class Login extends Component{
    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
       return  (this.state.redirect) &&
          <Redirect to='/options' />
      }
    render(){
        return(
            <LoginWrapper>
                Login
                {this.renderRedirect()}
            <button onClick={this.setRedirect}> Login </button>
            </LoginWrapper>
        )
    }
}
export default Login;