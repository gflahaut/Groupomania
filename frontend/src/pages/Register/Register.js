import React, { useState } from 'react';
import './Register.css';
import logo from '../../assets/Logos/icon.svg';
import Axios from 'axios';
import ResponsiveComponent from "react-responsive-component";
import { Button, Form, Col } from 'react-bootstrap';

function Register() {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');

    const Register = () => {
        Axios.post("http://localhost:5000/auth/signup",{
            password: password,
            name: name,
            firstname: firstname,
            email: email,
        }).then((response) => {
            
        });
    };
    
    return(
        <div className="Register">
            <ResponsiveComponent query="only screen and (max-width: 767px)">
            <form className="RegisterForm" class=" form-horizontal visible-xs-block" id="marker-xs">
                <img src={logo} alt="logo groupomania"/>
                <label class="col-xs-2 control-label mt-2">email</label>
                <input class="form-control" placeholder="Email" type="email" onChange={
                    (event) =>{ setEmail(event.target.value);}
                }/>
                <label class="col-xs-2 control-label mt-2">password</label>
                <input class="form-control" placeholder="Password" type="password"onChange={
                    (event) =>{ setPassword(event.target.value);}
                }/>
                <label class="col-xs-2 control-label mt-2">name</label>
                <input class="form-control" placeholder="Name" type="text" onChange={
                    (event) =>{ setName(event.target.value);}
                }/>
                <label class="col-xs-2 control-label mt-2 mb-2">firstname</label>
                <input class="form-control" placeholder="Firstname" type="text" onChange={
                    (event) =>{ setFirstname(event.target.value);}
                }/>
                <button type="submit" class="btn btn-secondary mt-4" onClick={Register}>Register</button>
            </form>
            </ResponsiveComponent>
            <ResponsiveComponent query="only screen and (min-width: 768px) and (max-width:991px)">
            <form className="RegisterForm" class=" form-horizontal visible-sm-block" id="marker-sm">
                <img src={logo} alt="logo groupomania"/>
                <label class="col-sm-2 control-label mt-2">email</label>
                <input class="form-control" placeholder="Email" type="email" onChange={
                    (event) =>{ setEmail(event.target.value);}
                }/>
                <label class="col-sm-2 control-label mt-2">password</label>
                <input class="form-control" placeholder="Password" type="password"onChange={
                    (event) =>{ setPassword(event.target.value);}
                }/>
                <label class="col-sm-2 control-label mt-2">name</label>
                <input class="form-control" placeholder="Name" type="text" onChange={
                    (event) =>{ setName(event.target.value);}
                }/>
                <label class="col-sm-2 control-label mt-2 mb-2">firstname</label>
                <input class="form-control" placeholder="Firstname" type="text" onChange={
                    (event) =>{ setFirstname(event.target.value);}
                }/>
                <button type="submit" class="btn btn-secondary mt-4" onClick={Register}>Register</button>
            </form>
            </ResponsiveComponent>
            <ResponsiveComponent query="only screen and (min-width: 992px)">
            <form className="RegisterForm" class=" form-horizontal visible-md-block" id="marker-md">
                <img src={logo} alt="logo groupomania"/>
                <label class="col-md-2 control-label mt-2">email</label>
                <input class="form-control" placeholder="Email" type="email" onChange={
                    (event) =>{ setEmail(event.target.value);}
                }/>
                <label class="col-md-2 control-label mt-2">password</label>
                <input class="form-control" placeholder="Password" type="password"onChange={
                    (event) =>{ setPassword(event.target.value);}
                }/>
                <label class="col-md-2 control-label mt-2">name</label>
                <input class="form-control" placeholder="Name" type="text" onChange={
                    (event) =>{ setName(event.target.value);}
                }/>
                <label class="col-md-2 control-label mt-2 mb-2">firstname</label>
                <input class="form-control" placeholder="Firstname" type="text" onChange={
                    (event) =>{ setFirstname(event.target.value);}
                }/>
                <button type="submit" class="btn btn-secondary mt-4" onClick={Register}>Register</button>
            </form>
            </ResponsiveComponent>
        </div>
    )
}
 
 export default Register;