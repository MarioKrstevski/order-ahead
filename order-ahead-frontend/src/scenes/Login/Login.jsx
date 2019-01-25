import React, { Component } from 'react';
import './login.styles.scss';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom'
import api from './services/api';
import { Form, Field } from 'react-final-form'

const LoginWrapper = styled.div`
    /* border: 1px solid black; */
`;
class Login extends Component{
    state = {
        isAuthenticated: false,
        email: "peter@klaven",
        password: "cityslicka",
        error: false
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

    renderError = () => {
        return  (this.state.error) &&
           <span style={{color:'red'}}> Login Failed </span>
     }

    async componentDidMount() {
        // let user = await fetchUser()
        // this.setState({ user })


    }
    tryLogin = async() =>{
        const userData = {
            email: this.state.email,
            // password: this.state.password
        }
        const response = await api.login(userData); 
        this.setState( state => {
            if( response.token ){
                return {
                    isAuthenticated: true,
                }
            } else {
                return {
                    error: true
                }
            }
        } , console.log('Response ' ,response));
    }
    render(){
        return(
            <LoginWrapper>

                
                Login
                {this.renderRedirect()}
                <button onClick={this.tryLogin}> Login </button>
                {this.renderError()}
            </LoginWrapper>
        )
    }
}
export default Login;