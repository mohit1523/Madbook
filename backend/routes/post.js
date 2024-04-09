const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const verifyuser = require("../middleware/verifyuser.js");

router.get("/getallposts", verifyuser, async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (allPosts) {
      res.status(200).send({ allPosts: allPosts, user: req.curruser });
    } else {
      res.status(200).send({ msg: "No posts to show", user: req.curruser });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/getpostsofuser", async (req, res) => {
  try {
    const allPosts = await Post.find({ user: req.body._id });
    if (allPosts) {
      res.status(200).send(allPosts);
    } else {
      res.status(200).send({ msg: "No posts to show" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/createpost", verifyuser, async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    user: req.curruser.id,
  });
  await newPost.save();
  res.send({ msg: "Post uploaded" , post:newPost});
});

module.exports = router;
