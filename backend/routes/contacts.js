const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("", (req,res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        query: req.body.query,
    });
    console.log(contact);
    contact.save();
    res.status(200).json({message: "Query Added!!"});
});

module.exports = router;
