const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.js");
const verifyuser = require("../middleware/verifyuser.js");

router.post("/addcomment", verifyuser, async (req, res) => {
    try {
        const newComment = new Comment({
            post: req.body.post,
            user: req.curruser.id,
            commentText: req.body.text
        });

        await newComment.save();

        res.status(200).send({ msg: "Comment posted" });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/getcomments", verifyuser, async (req, res) => {
    try {
        const allComments = await Comment.find({ post: req.body.postId });
        if (allComments) {
            res.status(200).send(allComments);
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/getcommentsOfuser", verifyuser, async (req, res) => {
    try {
        const allComments = await Comment.find({ user: req.curruser.id });
        if (allComments) {
            res.status(200).send(allComments);
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
