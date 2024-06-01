const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");


router.post("/signup", (req,res) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: "User Created!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
    });
});

router.post("/login", (req,res,next) => {
    let fetchedUser;
    User.findOne({username: req.body.username})
    .then(user => {
        console.log(user);
        if (!user){
            return res.status(401).json({
                message: "Auth Failed"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Auth Failed"
            });
        }
        const token = jwt.sign({
            username: fetchedUser.username,
            userId: fetchedUser._id}, 
            'this_is_the_hash', 
            {expiresIn: "1h"});
        res.status(200).json({token: token, expiresIn: 3600});
    })
    .catch(err => {
        return res.status(401).json({
            message: "Auth Failed"
        });
    });
});

router.get("/myposts",  checkAuth, (req, res) => {
    console.log(req.userData);
    Post.find({user_id: req.userData.userId}).then((documents) => {
        console.log(documents);
        if(documents) {
            res.status(200).json({message: "Successful", posts: documents});
        } else {
            res.status(404).json({message: "Post NoFound"});
        }
    });
});

module.exports = router;