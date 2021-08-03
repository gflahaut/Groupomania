import React, { Component, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Post from "./pages/Post/Post";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar";
import Logout from "./pages/Login/Logout";
import axios from "axios";
//import { useHistory } from 'react-router-dom';

class App extends React.Component {
  isLoggedIn() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);

    return parts.length === 2;
  }

  render() {
    // const isLoggedIn = this.isLoggedIn();

    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {isLoggedIn ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/logout">
            {isLoggedIn ? <Logout /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            {isLoggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/post">
            {isLoggedIn ? <Post /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/profile">
            {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
