import React from 'react';
import './Navbar.css';
import { useHistory } from "react-router-dom";

function Navbar() {
  let history = useHistory();
  function logout() {
    sessionStorage.clear();
    history.push('/login');
    
  }

    return(
  
        <div className="Navbar">
          <a href="/">Home</a>
          <a href="/Post">New Post +</a>
          <a href="/Profile">Profile</a>
          <a href=""onClick={logout} >Logout</a>
        </div>
    
      )
}

export default Navbar;