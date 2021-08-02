const mysql = require("../config/db.config");

exports.createPost = async function createPost(newPost) {
  const title = newPost.title;
  const description = newPost.description;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  const postUserId = newPost.postUserId;
  if(!newPost.image) {
    return (new HttpError("Image Not Found !", 400));
  }else if(!newPost.title){
    return (new HttpError("Title Not Found !", 400));
  }else if(!newPost.description){
    return (new HttpError("Description Not Found !", 400));
  }else if(!newPost.postUserId){
    return (new HttpError("You are not allowed to post !", 400));
  }
  try{
    const query = mysql.request(
  "INSERT INTO posts (`postUserId`,`title`, `description`, `imageUrl` ) VALUES ( ?, ?, ? , ?, );",
    [postUserId, title, description, imageUrl],);
    return query;
  }catch(err){
    console.log(err);
    throw err;
  }
};

exports.getAllPost = async function getAllPost() {
  try {
    const query = await mysql.request(
      "SELECT p.*,username FROM users u INNER JOIN posts p ON u.userId = p.postuserid;"
    );
    if (query.length>0){
      return query;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getPostsFromUser = async function getPostsFromUser(userid) {
  try {
    const query = await mysql.request(
      "SELECT * FROM posts WHERE postuserid = ?;", [userid]
    );
    console.log(query);
    return query;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getOnePost = async function getOnePost(userid) {
  try{
  const query = mysql.request("SELECT * FROM posts WHERE id = ?", [userid]
  );
    return query;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.modifyPost = async function modifyPost(post) {
  try{
    let params = [];
    let optionalModifs = "";
    if(post.postTitle.length > 0){
      optionalModifs += "title = ?";
      params.push(post.postTitle);
    }
    if(post.postDesc.length > 0){
      optionalModifs += ", description = ?";
      params.push(post.postDesc);
    }
    params.push(post.postId);
    const query = mysql.request(
      "UPDATE posts SET "+optionalModifs+" WHERE idposts = ?", params
    );
    return query;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.deletePost = async function deletePost(post) {
    try{
      const query = mysql.request("DELETE FROM posts WHERE idposts = ?",[post.postId]
      );
        return query;
      } catch (err) {
        console.log(err);
        throw err;
      }
};

exports.likePost = async function likePost(userid) {
  try{
    const query = mysql.request(
      "UPDATE posts SET likes = likes + 1 WHERE id = ?",[userid]);
  return query;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
