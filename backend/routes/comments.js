const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.get("/:id", (req, res) => {
    Comment.findOne({story_id: req.params.id}).then((comment) => {
        if(comment){
            res.status(200).json(comment);
        } else {
            res.status(404).json({message: "Cannot Find Comments for the post"});
        }
    });
});

router.post("", (req,res) => {
    const comment =  new Comment({
        story_id: req.body._id,
        cmnt_cnt: 0,
        cmnts: []
    });
    console.log(comment);
    comment.save();
    res.status(200).json({message: "Comment Array Created!"});
});

router.patch("/:id", (req,res) => {
    const newComment = req.body.comment;
    Comment.updateOne(
        {story_id: req.params.id},
        { $push: {cmnts: newComment}}
    ).then((result) => {
        res.status(200).json({message: "Comment added!"})
    });
});

router.delete("", (req, res) => {
    const id = req.body._id;
    console.log(id);
    Comment.deleteOne({story_id: id}).then((result) => {
        res.status(200).json({message: "Comment Array Deleted!!"});
    });
});

module.exports = router;
