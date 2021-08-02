const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const morgan = require('morgan');

const userCtrl = require("../controllers/user.controller");

morgan.token('id', (req, res) => {
    req.headers[':id']
    res.send('id')
});
//Create Routes 
router.post("/signup", userCtrl.signup);

//Login Routes
router.post("/login", userCtrl.login);

router.post("/infos", userCtrl.getInfos);

router.post("/filter", userCtrl.getUsersFromSearch);

module.exports = router;
