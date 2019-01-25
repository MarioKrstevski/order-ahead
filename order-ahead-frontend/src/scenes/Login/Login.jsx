import React, { Component } from 'react';
import './login.styles.scss';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom'
import api from './services/api';

const LoginWrapper = styled.div`
    /* border: 1px solid black; */
`;
class Login extends Component{
    state = {
        isAuthenticated: false,
        email: "peter@klaven",
        password: "cityslicka",
        response: '',
    }
    setRedirect = () => {
        this.setState({
            isAuthenticated: true
        })
    }
    renderRedirect = () => {
       return  (this.state.isAuthenticated) &&
          <Redirect to='/options' />
    }

    async componentDidMount() {
        // let user = await fetchUser()
        // this.setState({ user })


    }
    tryLogin = async() =>{
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        const response = await api.login(userData);
        this.setState({response}, console.log('Response ' ,response));
        this.setRedirect();
    }
    render(){
        return(
            <LoginWrapper>
                Login
                {this.renderRedirect()}
                <button onClick={this.tryLogin}> Login </button>
            </LoginWrapper>
        )
    }
}
export default Login;