const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mariadb");
const model = require("../models/user.model");

exports.signup = async (req, res, next) => {
  try {
    let newUser = { ...req.body };
    console.log('userCtrl', newUser);
    await model.createUser(newUser);
    res.status(201).json({ message: "User created !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.login = async (req, res, next) => {
  try {
    let user = { ...req.body };
    console.log('userCtrl', user);
    let result = await model.compareUser(user);
    if (result.code == 1 || result.code == 2){
      res.status(201).json({ message: result.message, result:false });
    }else{
      res.status(201).json({ message: "Connected successfully !", result:true, userid: result.userid, token: result.token, username: result.username});
    }
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "Connection Failed !", result:false });
  }
};

exports.getInfos = async (req, res, next) => {
  try {
    let params = { ...req.body };
    console.log('userCtrl', params);
    let result = await model.getInfos(params.userid);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "Infos retrieval Failed !", result:false });
  }
};

exports.getUsersFromSearch = async (req, res, next) => {
  try {
    let params = { ...req.body };
    console.log('userCtrl', params);
    let result = await model.getUsersFromSearch(params.search);
    console.log(result);
    if(result.code && result.code == 1){
      res.status(201).json({ message: result.message, result:false });
    }
    res.status(201).json({ content: result, result:true });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "A problem has occured", result:false });
  }
};


exports.deleteUser = async (req, res, next) => {
  try {
    let User = { ...req.params.id };
    console.log('userCtrl',User);
    // let result = await model.deletePost(User);
    res.status(200).json({ message: "User Delete successfully !" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
