const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("", (req,res) => {
    Post.find().then((documents) => {
        res.status(200).json({message: "Successful", posts: documents})
    });
});

router.get("/:id", (req, res) => {
    Post.findById(req.params.id).then((post) => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post Not Found"});
        }
    });
});

router.post("", (req,res) => {
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

router.put("/:id", (req, res) => {
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

router.patch("/:id", (req, res) => {
    const newLike = req.body.likes;
    Post.updateOne({_id: req.params.id}, [
        { $set: { likes: newLike} },
    ]).then((result) => {
        res.status(200).json({message: "Updated!!"});
    });
});

router.delete("", (req, res) => {
    const id = req.body._id;
    Post.deleteOne({_id: id }).then((result) => {
        res.status(200).json({message: "Post Deleted"});
    });
});

module.exports = router;
