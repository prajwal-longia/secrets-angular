const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

router.get("", checkAuth, (req,res) => {
    Post.find().then((documents) => {
        res.status(200).json({message: "Successful", posts: documents})
    });
});

router.get("/:id",  checkAuth, (req, res) => {
    Post.findById(req.params.id).then((post) => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post Not Found"});
        }
    });
});

router.post("", checkAuth, (req,res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes,
    });
    console.log(post);
    post.save();
    console.log(post._id);
    res.status(200).json({message: "Post Added!!", _id: post._id});
});

router.put("/:id",  checkAuth, (req, res) => {
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes
    });;  
    Post.updateOne({_id: req.params.id}, post).then((result) => {
        res.status(200).json({message: "Post updated! "});
    });
    console.log(post);
});

router.patch("/:id",  checkAuth, (req, res) => {
    const newLike = req.body.likes;
    Post.updateOne({_id: req.params.id}, [
        { $set: { likes: newLike} },
    ]).then((result) => {
        res.status(200).json({message: "Updated!!"});
    });
});

router.delete("",  checkAuth, (req, res) => {
    const id = req.body._id;
    Post.deleteOne({_id: id }).then((result) => {
        res.status(200).json({message: "Post Deleted"});
    });
});

module.exports = router;
