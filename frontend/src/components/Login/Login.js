import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/Logos/icon-above-font.svg";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ResponsiveComponent from "react-responsive-component";
import { Alert, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  function dologin() {
    let baseUrl = "http://localhost:5000/auth/login";
    const bodyParameters = {
      username: username,
      password: password,
    };
    Axios.post(baseUrl, bodyParameters)
      .then((response) => {
        if (response.data.result && response.data.token) {
          sessionStorage.setItem("userid", response.data.userid);
          sessionStorage.setItem("username", response.data.username);
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("authToken", response.data.token);
          sessionStorage.setItem("role", response.data.role);
          history.push("/");
        } else {
          sessionStorage.getItem("isLoggedIn", false);
          setErrorMessage(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  function doregister(){
    history.push('/register');
  }

  return (
    <div className="Login">
      <Alert className="lalert" variant="danger">
        <Alert.Heading>{errorMessage}</Alert.Heading>
      </Alert>
      <ResponsiveComponent query="only screen and (max-width: 767px)">
        <Form
          className="LoginForm"
          class="form-horizontal visible-xs-block"
          id="marker-xs"
        >
          <img src={logo} alt="logo groupomania" />
          <div className="form-group">
            <label className="col-xs-2 control-label">username</label>
            <input
              className="username form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="col-xs-2 control-label">Password</label>
            <input
              className="password form-control"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-xs-offset-2 col-xs-10">
            <button
              type="button"
              className="btn btn-secondary mt-4"
              onClick={dologin}
            >
              Login
            </button>
          </div>
          <div className="col-xs-offset-2 col-xs-10">
            <button
              type="button"
              className="btn btn-secondary mt-4"
              onClick={doregister}
            >
              Register
            </button>
          </div>
        </Form>
      </ResponsiveComponent>
      <ResponsiveComponent query="only screen and (min-width: 768px) and (max-width:991px)">
        <Form
          className="LoginForm"
          class="form-horizontal visible-sm-block"
          id="marker-sm"
        >
          <img src={logo} alt="logo groupomania" />
          <div className="form-group">
            <label className=" col-sm-2 control-label">username</label>
            <input
              className="username form-control"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className=" col-sm-2 control-label">Password</label>
            <input
              className="password form-control"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-sm-offset-2 col-sm-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={dologin}
            >
              Login
            </button>
          </div>
          <div className="col-sm-offset-2 col-sm-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={doregister}
            >
              Register
            </button>
          </div>
        </Form>
      </ResponsiveComponent>
      <ResponsiveComponent query="only screen and (min-width: 992px)">
        <Form
          className="LoginForm"
          class="form-horizontal visible-md-block"
          id="marker-md"
        >
          <img src={logo} alt="logo groupomania" />
          <div className="form-group">
            <label className="col-md-2 control-label">username</label>
            <input
              className="username form-control username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className=" col-md-2 control-label">Password</label>
            <input
              className="password form-control password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-offset-2 col-md-10">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={dologin}
            >
              Login
            </button>
          </div>
          <div className="col-md-offset-2 col-md-10">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={doregister}
            >
              Register
            </button>
          </div>
        </Form>
      </ResponsiveComponent>
    </div>
  );
}

export default Login;
