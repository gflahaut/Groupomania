const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer.config");
const postCtrl = require("../controllers/post.controller");
const mailCtrl = require("../controllers/mail.controller");

// Create Routes 
router.post("/create", auth, postCtrl.createPost);
router.post("/mail", auth, mailCtrl.sendMail);
router.post("/like",  auth, postCtrl.likePost);

// Read Routes 
router.post("/fromUser",  auth, postCtrl.getPostsFromUser);
router.get("/all",  auth, postCtrl.getAllPost);
router.get("/id/one",  auth, postCtrl.getOnePost);

//Update Routes 
router.post("/update", multer, auth, postCtrl.modifyPost);

//Delete Routes
router.post("/delete", auth, postCtrl.deletePost);

module.exports = router;
