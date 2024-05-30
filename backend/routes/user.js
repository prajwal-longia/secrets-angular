const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");


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

module.exports = router;