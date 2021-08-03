import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/Logos/icon-above-font.svg';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ResponsiveComponent from "react-responsive-component";
import { Alert, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function Login() {


    const [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();
    let username = document.getElementsByClassName("username")[0].value;
    let password = document.getElementsByClassName("password")[0].value;
    let token = localStorage.getItem("token");
    let baseUrl = "localhost:5000/auth/login";
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const bodyParameters = { 
        username: username,
        password: password, 
    };
    let customRequest = Axios.create(baseUrl, bodyParameters, config)
    const encodedString = Buffer.from(username + ":" + password).toString('base64');
    customRequest.append('Authorization', 'Basic' + encodedString)
          .then((response)=> {
            if (response.data.result && response.data.token) {
                sessionStorage.setItem("userid", response.data.userid);
                sessionStorage.setItem("username", response.data.username);
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("token", response.data.token);
                history.push("/");
            }else{
                localStorage.getItem("isLoggedIn", false);
                setErrorMessage(response.data.message);
                history.push("/register");
            }
          })
          .catch((err)=>{
              console.log(err);
              throw err;
          });

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
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-xs-2 control-label">Password</label>
                    <input
                      className="password form-control"
                      placeholder="Password"
                      type="password"
                      value={password}
                    />
                  </div>
                  <div className="form-group">
                    <div className="col-xs-offset-2 col-xs-10">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" />
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-offset-2 col-xs-10">
                    <button
                      type="submit"
                      className="btn btn-secondary mt-4"
                      onClick={Login}
                    >
                      Login
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
                      value={username}
                    />
                  </div>
                  <div className="form-group">
                    <label className=" col-sm-2 control-label">Password</label>
                    <input
                      className="password form-control"
                      placeholder="Password"
                      type="password"
                      value={password}
                    />
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" />
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-offset-2 col-sm-10">
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      onClick={Login}
                    >
                      Login
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
                    />
                  </div>
                  <div className="form-group">
                    <label className=" col-md-2 control-label">Password</label>
                    <input
                      className="password form-control password"
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                  <div className="form-group">
                    <div className="col-md-offset-2 col-md-10">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" />
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-offset-2 col-md-10">
                    <button className="btn btn-secondary" onClick={Login}>
                      Login
                    </button>
                  </div>
                </Form>
              </ResponsiveComponent>
            </div>
          );
        };

 export default Login;