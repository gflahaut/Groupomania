import React, { useState } from 'react';
import './Register.css';
import logo from '../../assets/Logos/icon.svg';
import Axios from 'axios';

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
            <div className="RegisterForm">
                <img src={logo} alt="logo groupomania"/>
                <label>email</label>
                <input type="email" onChange={
                    (event) =>{ setEmail(event.target.value);}
                }/>
                <label>password</label>
                <input type="password"onChange={
                    (event) =>{ setPassword(event.target.value);}
                }/>
                <label>name</label>
                <input type="text" onChange={
                    (event) =>{ setName(event.target.value);}
                }/>
                <label>firstname</label>
                <input type="text" onChange={
                    (event) =>{ setFirstname(event.target.value);}
                }/>
                <button onClick={Register}>Register</button>
            </div>
        </div>
    )
}
 
 export default Register;