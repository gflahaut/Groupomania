// import React, { Component } from 'react';
// import REACTDOM from 'react-dom';
// import './Navbar.css';
// import { useHistory } from 'react-router-dom';

// function Navbar (){
//      let log = localStorage.getItem(isLoggedIn);
//      console.log(log);

//      useEffect(() => {
//         setisLoggedIn(log);
//     }, [isLoggedIn]);

//     return(
//         <div className="Navbar">
//             <a href="/">Home</a>
//             { isLoggedIn ? 
//             <>
//                 <a href="/Register">Register</a>
//                 <a href="/Login">Login</a>
//             </>
//             :
//             <>
//                 <a href="/Profile">Profile</a>
//                 <a href="/Post">New Post +</a>
//                 <a href="/logout">Logout</a>
//             </>
//             }
//         </div>
//     );

    
// }

// export default Navbar;
import React from 'react';
import {
    useLocation,
    Link
} from 'react-router-dom';

import './Navbar.css';

function Navbar() {
    let { pathname } = useLocation();

    return (
        <Navbar>
            { pathname === '/register' || pathname === '/login' ? (
                <ul className="header__nav">
                    <li>
                        <Link
                            to="/register"
                            className={pathname === '/register' ? 'active' : ''}
                        >Register</Link>
                    </li>
                    <li>
                        <Link
                            to='/login'
                            className={pathname === '/login' ? 'active' : ''}
                        >Login</Link>
                    </li>
                </ul>
            ) : (
                <ul className="header__nav">
                    <li>
                        <Link to='/' className="active">Home</Link>
                    </li>
                    <li>
                        <Link to='/post' className="active">Post</Link>
                    </li>
                    <li>
                        <Link to='/profile' className="active">Profile</Link>
                    </li>
                    <li>
                        <Link to='/logout'>Logout</Link>
                    </li>
                </ul>
            )}
        </Navbar>
    );
}

export default Navbar;