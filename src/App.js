import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Post from "./pages/Post/Post";
import Profile from "./pages/Profile/Profile";
import Logout from "./pages/Login/Logout";
import { ReactSession } from 'react-client-session';
// import axios from "axios";
// import { useHistory } from 'react-router-dom';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
  crossorigin="anonymous"
/>




function App() {
    ReactSession.setStoreType("localStorage");

  return (
    <>
    <Navbar/>
    <Router>
      <Switch>
      <Route path="/" exact render={() => <Home/>} />
      <Route path="/login" exact render={() => <Login/> }/>
      <Route path="/logout" exact render={() => <Logout/> }/>
      <Route path="/register" exact render={() => <Register/>} />
      <Route path="/post" exact render={()=> <Post/>} />
      <Route path="/profile" exact render={()=> <Profile/>} />
      </Switch>
    </Router>
    </>
  )
}

export default App;
