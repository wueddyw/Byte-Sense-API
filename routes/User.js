const express = require("express");
const mongoose = require("mongoose");
const user = require("../db/User");
const router = express.Router();

// POST data?
router.post("/", async (req, res) =>
{
    const {userName, password } = req.body;
    let user = {};
    user.userName = userName;
    user.password = password;
    let userModel = new User(user);
    await userModel.save();
    res.send(userModel);
    console.log("Sent response from User.js");
});

// router.get("/", function (req, res, next)
// {
//     // const {userName, password } = req.body;
//     // let user = {};
//     // user.userName = userName;
//     // user.password = password;
//     // let userModel = new User(user);
//     // userModel.save();
//     // res.send(userModel);
//     console.log("Sent response from User.js");
// });

module.exports = router;