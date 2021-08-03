import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/Logos/icon-above-font.svg';
import Axios from 'axios';
// 

import ResponsiveComponent from "react-responsive-component";
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { createAuthProvider } from 'react-token-auth';


function Login() {
   
    const [errorMessage, setErrorMessage] = useState('');

    // let history = useHistory();
    
    function loginInfos(e){
        e.preventDefault();
        let username = document.getElementsByClassName("username")[0].value;
        let password = document.getElementsByClassName("password")[0].value;
        let token = localStorage.getItem('token');
        let baseUrl = 'localhost:5000/auth/login';
        const config = { headers: { 'Authorization': `Bearer ${token}`}};
        const bodyParameters ={ key : "value"};

        let customRequest = Axios.create( baseUrl , bodyParameters, config)
            .then(console.log)
            .catch(console.log);

        //   customRequest.append('Authorization', 'Basic' + base64.encode(username + ":" + password))
        //   .post('/auth/login',
        //   { username: username, password: password })
        //   .then(function (response) {
        //     console.log(response);
        //     if (response.data.result && response.data.token) {
        //         localStorage.setItem("userid", response.data.userid);
        //         localStorage.setItem("username", response.data.username);
        //         localStorage.setItem("loggedIn", "true");
        //         localStorage.setItem("token", response.data.token);
        //         history.push("/");
        //     }else{
        //         setErrorMessage(response.data.message);
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        // Axios.post('http://localhost:5000/auth/login',{
        //     headers: {'Authorization': `Basic ${token}`},
        //     body: { username: username, password: password }
        // })
        //     .then((response) => {
        //         if (response.data.result && response.data.token) {
        //             localStorage.setItem("userid", response.data.userid);
        //             localStorage.setItem("username", response.data.username);
        //             localStorage.setItem("loggedIn", "true");
        //             localStorage.setItem("token", response.data.token);
        //             history.push("/");
        //         }else{
        //             setErrorMessage(response.data.message);
        //         }
        //     })
    }

    return (
        <div className="Login">
            <Alert className="lalert"variant="danger">
                <Alert.Heading>
                    { errorMessage} 
                </Alert.Heading>
            </Alert>
            <ResponsiveComponent query="only screen and (max-width: 767px)">
                <form className="LoginForm" className=" form-horizontal visible-xs-block" id="marker-xs">
                    <img src={ logo } alt="logo groupomania"/>
                    <div className="form-group">
                        <label className="col-xs-2 control-label">username</label>
                        <input className="form-control" type="text" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <label className="col-xs-2 control-label">Password</label>
                        <input className="form-control" placeholder="Password" type="password"/>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-offset-2 col-xs-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-offset-2 col-xs-10">
                        <button type="submit" className="btn btn-secondary mt-4" onClick={ loginInfos }>Login</button>
                    </div>
                </form>
            </ResponsiveComponent>
            <ResponsiveComponent query="only screen and (min-width: 768px) and (max-width:991px)">
            <form className="LoginForm" className=" form-horizontal visible-sm-block" id="marker-sm">
                    <img src={ logo } alt="logo groupomania" />
                    <div className="form-group">
                        <label className="col-sm-2 control-label">username</label>
                        <input className="form-control" type="text" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Password</label>
                        <input className="form-control" placeholder="Password" type="password" />
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-secondary" onClick={ loginInfos }>Login</button>
                    </div>
                </form>
            </ResponsiveComponent>
            <ResponsiveComponent query="only screen and (min-width: 992px)">
            <form className="LoginForm" className=" form-horizontal visible-md-block" id="marker-md">
                    <img src={ logo } alt="logo groupomania" />
                    <div className="form-group">
                        <label className="col-md-2 control-label">username</label>
                        <input className="form-control username" type="text" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Password</label>
                        <input className="form-control password" placeholder="Password" type="password" />
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-offset-2 col-md-10">
                        <button className="btn btn-secondary" onClick={loginInfos}>Login</button>
                    </div>
                </form>
            </ResponsiveComponent>
        </div>
    );
};

export default Login;