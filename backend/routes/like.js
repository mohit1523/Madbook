const express = require("express");
const router = express.Router();
const Like = require("../models/Like.js");
const verifyuser = require("../middleware/verifyuser.js");

router.post("/addlike", verifyuser, async (req, res) => {
    try {
        const newLike = new Like({
            post: req.body.postId,
            likedUser: req.curruser.id
        });

        await newLike.save();

        res.status(200).send({ msg: "Like <3 posted" });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/getlikes", verifyuser, async (req, res) => {
    try {
        const allLikes = await Like.find({post : req.body.postId});
        const currUserLike = await Like.findOne({post: req.body.postId, likedUser: req.curruser.id});
        if(currUserLike){
            res.status(200).send({currUserLike: true, likes: allLikes});
        }
        else{
            res.status(200).send({currUserLike: false, likes: allLikes});
        }

    } catch (error) {
        res.status(400).send(error);
    }
});


router.delete("/deletelike", verifyuser, async (req, res) => {
    try {
        await Like.deleteOne({ post: req.body.postId, likedUser: req.curruser.id });
        res.status(200).send({msg : "Like <3 removed"});
        
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
