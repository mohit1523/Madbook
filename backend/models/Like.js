const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = new mongoose.model("Like", likeSchema);
