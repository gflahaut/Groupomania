import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import Profile from "./components/Profile/Profile";

function App() {
   
  return (
    <>
    <Router>
      <Switch>
      <Route path="/" exact render={() => <Home/>} />
      <Route path="/login" exact render={() => <Login/> }/>
      <Route path="/register" exact render={() => <Register/>} />
      <Route path="/post" exact render={()=> <Post/>} />
      <Route path="/profile" exact render={()=> <Profile/>} />
      </Switch>
    </Router>
    </>
  )
}

export default App;