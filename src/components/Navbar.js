import React from 'react';
import './Navbar.css';

function Navbar() {

    let log = localStorage.getItem('loggedIn');

    function isLoggedInTrue(props){
      return( 
        <div className="Navbar">
          <a href="/Profile">Profile</a>
          <a href="/Post">New Post +</a>
          <a href="/logout">Logout</a>
        </div>
      )}

    function isLoggedInFalse(props){
      return( 
        <div className="Navbar">
          <a href="/Profile">Profile</a>
          <a href="/Post">New Post +</a>
        </div>
      )
    }

   function showIfisLoggedIn(props){
     
    const isLoggedIn = props.isLoggedIn;
    if (log === true) {
      return<isLoggedInTrue />;
    }
      return<isLoggedInFalse />;

    }elseif (isLoggedIn === true)
      return<isLoggedInTrue />;
    }

    return(
      // Try changing to isLoggedIn={false} log={false}:
      <showIfisLoggedIn isLoggedIn={true}/>
      )
}
export default Navbar;