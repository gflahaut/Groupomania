const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const morgan = require('morgan');

const userCtrl = require("../controllers/user.controller");

morgan.token('id', (req, res) => {
    req.headers[':id']
    res.send('id')
});


//Signup Routes
router.post("/signup", userCtrl.signup);

//Login Routes
router.post("/login", userCtrl.login);

//Infos Profile Pages Routes
router.post("/infos", auth, userCtrl.getInfos);

//Role User-Admin Routes
router.post("/role",  auth, userCtrl.getRole);

//Filterer User Routes
router.post("/filter", auth, userCtrl.getUsersFromSearch);

// Delete User Route
router.delete("/delete", auth, userCtrl.deleteUser);

module.exports = router;
