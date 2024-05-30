const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
        const token = jwt.sign({username: fetchedUser.username, userId: fetchedUser._id}, 'this_is_the_hash', {expiresIn: "1h"});

    })
    .catch(err => {
        return res.status(401).json({
            message: "Auth Failed"
        });
    });
});

module.exports = router;