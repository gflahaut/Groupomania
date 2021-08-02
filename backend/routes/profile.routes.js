const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user.controller");

//Read User Routes 
router.get("/infos", userCtrl.getInfos);

// Delete User Route
router.delete("/:id/delete", auth, userCtrl.deleteUser);

module.exports = router;