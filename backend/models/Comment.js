const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now,
    },
    commentText: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("Comment", commentSchema);
