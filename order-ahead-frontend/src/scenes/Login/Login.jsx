import React, { useState, useContext } from "react";

import "./login.styles.scss";
import styled from "styled-components";

import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-focus";

import api from "./services/api";
import { AuthContext } from "../../AuthContext";
import { navigate } from "@reach/router";

const LoginWrapper = styled.div`
  /* border: 1px solid black; */
`;
const FieldRow = styled.div`
  background-color: ${props => (props.active ? "lightcyan" : "white")};
`;
function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const { setUser } = useContext(AuthContext);

  const renderError = () =>
    error && <span style={{ color: "red" }}> Login Failed </span>;
  const required = value => (value ? undefined : "Required");

  const tryLogin = async ({ username, password }) => {
    const userData = {
      email: username,
      password
    };
    const response = await api.login(userData);
    console.log("Response ", response);

    // email: "eve.holt@reqres.in",
    // password: "cityslicka",
    // or just any information works as well

    if (response.token) {
      setIsAuthenticated(true);
      setUser({
        name: response.name,
        token: response.token,
        role: response.role,
        isAuthenticated: true
      });
      navigate("/dailymenu");
    } else {
      setError(true);
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
      <button onClick={tryLogin}> Login </button>
      {renderError()}
    </LoginWrapper>
  );
}
export default Login;
