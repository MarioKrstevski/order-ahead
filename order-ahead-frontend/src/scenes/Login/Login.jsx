import React, { useState } from "react";
import "./login.styles.scss";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import api from "./services/api";
import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-focus";

const LoginWrapper = styled.div`
  /* border: 1px solid black; */
`;
const FieldRow = styled.div`
  background-color: ${props => (props.active ? "lightcyan" : "white")};
`;
function Login(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);
    
    const renderRedirect = () => isAuthenticated && <Redirect to="/options" />;
    const renderError = () => error && <span style={{ color: "red" }}> Login Failed </span>;
    const required = value => (value ? undefined : "Required");
  
    const tryLogin = async ({ username, password }) => {
    const userData = {
      username,
      password
    };
    const response = await api.login(userData);
    response.token ? setIsAuthenticated(true) : setError(true);
    console.log("Response ", response);

    // email: "peter@klaven",
    // password: "cityslicka",
    // or just any information works as well

    if (response.token) {
        setIsAuthenticated(true)
    } else {
        setError(true)
    }
  };
    const focusOnError = createDecorator();
    return (
      <LoginWrapper>
        <Form
          onSubmit={tryLogin}
          decorators={[focusOnError]}
          subscription={{
            submitting: true,
            values: true
          }}
        >
          {({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="username"
                  placeholder="Username"
                  validate={required}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true
                  }}
                >
                  {({ input, meta, placeholder }) => (
                    <FieldRow active={meta.active}>
                      <label htmlFor="username">Username</label>
                      <input {...input} placeholder={placeholder} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </FieldRow>
                  )}
                </Field>
              </div>
              <div>
                <Field
                  name="password"
                  placeholder="Password"
                  validate={required}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true
                  }}
                >
                  {({ input, meta, placeholder }) => (
                    <FieldRow active={meta.active}>
                      <label htmlFor="password">Password</label>
                      <input {...input} placeholder={placeholder} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </FieldRow>
                  )}
                </Field>
              </div>

              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                  <pre>{JSON.stringify(values, undefined, 2)}</pre>
                )}
              </FormSpy>
              {/* Weird bug if </FormSpy> is next to the } in the row above , it is an error... */}
              <pre>{JSON.stringify(values, undefined, 2)}</pre>
            </form>
          )}
        </Form>
        Login
        {renderRedirect()}
        <button onClick={tryLogin}> Login </button>
        {renderError()}
      </LoginWrapper>
    );
}
export default Login;
