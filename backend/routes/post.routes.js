const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer.config");
const postCtrl = require("../controllers/post.controller");

// Create Routes 
router.post("/create", postCtrl.createPost);
router.post("/id/like", postCtrl.likePost);

// Read Routes 
router.post("/fromUser", postCtrl.getPostsFromUser);
router.get("/all",  postCtrl.getAllPost);
router.get("/id/one", postCtrl.getOnePost);

//Update Routes 
router.post("/update", multer, postCtrl.modifyPost);

//Delete Routes
router.post("/delete", postCtrl.deletePost);

module.exports = router;
