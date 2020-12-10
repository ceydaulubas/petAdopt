import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import {withRouter} from 'react-router-dom';
import Image from "../../images/cd.jpg"

import AuthService from "../../services/auth-service";

const initialState = { username: "", password: "" };

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const service = new AuthService();

  // Function to handle form submit in the input fields
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password } = loginState;

    service
      .login(username, password)
      .then((response) => {
        setLoginState(initialState);
        props.getUser(response);
        props.history.push("/aboutpage");
      })
      .catch((error) => {
        const { message } = error.response.data;
        setLoginErrorMsg(message);
        console.log(error);
      });
  };

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${Image})` , backgroundSize:"cover", width:"100%", height:"750px",}} >
    <div className="login-form" >
      <form onSubmit={handleFormSubmit}>
        <h1>Log In</h1>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={loginState.username}
          onChange={handleChange}
          className="txtb"
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
          className="txtb"
        />

        <input type="submit" value="Login" className="login-btn"  />
      </form>
      <br />

      {loginErrorMsg && <span style={{ color: "red" }}>{loginErrorMsg}</span>}

      <p>
        Don't have account?
      <Link to={"/signup"}> Signup</Link>
      </p>
    </div>
    </div>
  );
};

export default withRouter(Login)