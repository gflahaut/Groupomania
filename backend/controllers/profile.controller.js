// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/user.model");
// const auth = require("../config/auth");
// const { response } = require("../app");

// router.get(
//   "/users",
//   auth.checkAuthentication("USER"),
//   async function (req, res) {
//     let userProfile = await userModel.read(request.user.username);
//     response.render("profile", {
//       user: userProfile,
//       type: "USER",
//     });
//   }
// );

// router.get(
//   "/admin",
//   auth.checkAuthentication("ADMIN"),
//   async function (req, res) {
//     let userProfile = await userModel.read(request.user.username);
//     let listProfile = await userModel.list();
//     response.render("profile", {
//       user: userProfile,
//       profile: listProfile,
//       type: "ADMIN",
//     });
//   }
// );

// module.exports = router;
