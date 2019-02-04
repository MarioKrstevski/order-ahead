import React, { Component } from 'react';
import './login.styles.scss';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom'
import api from './services/api';
import { Form, Field, FormSpy } from 'react-final-form';
import createDecorator from 'final-form-focus'; 

const LoginWrapper = styled.div`
    /* border: 1px solid black; */
`;
const FieldRow = styled.div`
    background-color: ${props => props.active ? 'lightcyan' : 'white'};
`;
class Login extends Component{
    state = {
        isAuthenticated: false,
        error: false
    }
    setRedirect = () => {
        this.setState({
            isAuthenticated: true
        })
    }

    setError = () => {
        this.setState({
            error: true
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

    tryLogin = async values =>{
        console.log('The Values: ' , values);

            const userData = {
                username: values.username,
                password: values.password,
            }
            console.log('The userData: ' , userData);
            const response = await api.login(userData); 
            response.token ? this.setRedirect() : this.setError();
            console.log('Response ' ,response);
       

        // email: "peter@klaven",
        // password: "cityslicka",
        // or just any information works as well

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

    required = value => (value ? undefined: 'Required');

    render(){

        const focusOnError = createDecorator();
        return(
            <LoginWrapper>
                <Form onSubmit={this.tryLogin} 
                    decorators={[focusOnError]}
                    subscription={{
                        submitting: true,
                        values: true
                    }}>
                    {({handleSubmit, values, submitting}) => <form onSubmit={handleSubmit}>
                        <div>
                            <Field 
                                name="username" 
                                placeholder="Username"
                                validate={this.required}
                                subscription={{
                                    value: true,
                                    active: true,
                                    error: true,
                                    touched: true
                                }}
                            >
                            {({input, meta, placeholder}) => (
                                <FieldRow active={meta.active}>
                                    <label htmlFor="username">Username</label>
                                    <input {...input} placeholder={placeholder}/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>   }
                                </FieldRow>
                            )}
                            </Field>

                        </div>
                        <div>
                            <Field 
                                name="password" 
                                placeholder="Password"
                                validate={this.required}
                                subscription={{
                                    value: true,
                                    active: true,
                                    error: true,
                                    touched: true
                                }}
                            >
                            {({input, meta, placeholder}) => (
                                <FieldRow active={meta.active}>
                                    <label htmlFor="password">Password</label>
                                    <input {...input} placeholder={placeholder}/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>   }
                                </FieldRow>
                            )}
                            </Field>
                        </div>
                        
                        <button type="submit" disabled={submitting}>Submit</button>
                        <FormSpy  subscription={{values: true}}>  
                        {({values}) => (
                            <pre>{JSON.stringify(values , undefined, 2)}</pre>
                        )} 
                        </FormSpy>
                        {/* Weird bug if </FormSpy> is next to the } in the row above , it is an error... */}
                        <pre>{JSON.stringify(values , undefined, 2)}</pre>
                        </form>
                    }
                </Form>
                
                Login
                {this.renderRedirect()}
                <button onClick={this.tryLogin}> Login </button>
                {this.renderError()}
            </LoginWrapper>
        )
    }
}
export default Login;