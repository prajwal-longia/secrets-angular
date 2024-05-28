const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    story_id: {type: String, required: true},
    cmnt_cnt: {type: Number, required: true},
    cmnts: [],
})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;