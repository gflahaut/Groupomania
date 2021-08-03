const mysql = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const jwtConfig = require("../config/jwt");



exports.createUser = async function createUser(newUser) {
  try {
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const query = mysql.request(
      "INSERT INTO `users` (`username`, `password`, `name`, `firstname`, `email`) VALUES (?, ? , ? , ?, ? );",
      [
        newUser.firstname.charAt(0)+newUser.name,
        newUser.password,
        newUser.name,
        newUser.firstname,
        newUser.email = firstname.charAt(0)+newUser.name+'@groupomania.com',
      ]
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.compareUser = async function compareUser(user) {
  try {
    const token = jwt.sign({
      data: user.id,
    }, process.env.JWT_SECRET, { expiresIn: '5h' }); //5 hour
    console.log('user.model.compareUser',token);
    const query = await mysql.request(
      "SELECT * FROM Users WHERE username ='" + user.username + "';"
    );
    if (query.length == 0){
      return ({ code : 1, message :" Username not found !"});
    }
    let passwordChecked = await bcrypt.compare(
      user.password,
      query[0].password
    );
    if (passwordChecked) {
      return {
        userid: query[0].userId,
        token : token,
        username: query[0].username
      };
    }else{
      return ({ code : 2, message :" Wrong Password ! "});
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


exports.getInfos = async function getInfos(userid) {
  console.log(userid);
  try {
    const query = await mysql.request(
      "SELECT * FROM users WHERE userid = ?;", [userid]
    );
    if (query.length > 0){
      return (query);
    }else{
      return ({ code : 1, message : " Found no users matching your search !"})
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getRole = async function getRole(userid) {
  console.log(userid);
  try {
    const query = await mysql.request(
      "SELECT role FROM users WHERE userid = ?;", [userid]
    );
    if (query.length > 0){
      return (query);
    }else{
      return ({ code : 1, message : " Found no user matching this id !"})
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getUsersFromSearch = async function getUsersFromSearch(search) {
  // console.log(search);
  try {
    let query = "";
    if(search === search.split(" ")[0]){
       query = await mysql.request(
        "SELECT * FROM users WHERE username LIKE '"+search+"%' OR name LIKE '"+search+"%' OR firstname LIKE '"+search+"%';"
      );
    }else{
      search = search.split(" ");
      // console.log("HERE 2");
      // console.log(search[0]);
      // console.log(search[1]);
      query = await mysql.request(
        "SELECT * FROM users WHERE firstname LIKE '"+search[0]+"%' && name LIKE '"+search[1]+"%';"
      );
    }
    console.log(query)
    if (query.length > 0){
      return (query);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.deleteUser = async function deleteUser(userid) {
  console.log(userid);
  try{
    const query = await mysql.request(
      "DELETE FROM users WHERE userid = ? ;",[userid]
    );
    return query;
  }catch(error){
    throw error;
  }
};