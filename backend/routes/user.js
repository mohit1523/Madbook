const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyuser = require("../middleware/verifyuser.js");
const JWT_SECRET = "Mohit@123";
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, `../userProfilePhotos`)
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + '-' + file.originalname);
  }
})

const upload = multer({ storage: storage })

router.get("/getusers", verifyuser, async (req, res) => {
  try {
    const users = await User.find();
    res.send({ users: users, user: req.curruser });
  } catch (error) {
    console.log(error);
  }
});


router.post("/getsingleuser", verifyuser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    res.send({ user: user });
  } catch (error) {
    console.log(error);
  }
});

router.post("/createuser", upload.single('profilePhoto'), (req, res) => {
  try {
    const password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          password: hash,
          email: req.body.email,
          profilePhoto: req.file.path
        });
        await newUser.save();

        const data = {
          user: {
            id: newUser.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authtoken });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/loginuser", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const reqPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (reqPassword) {
        const data = {
          user: {
            id: user.id,
          },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);

        res
          .status(200)
          .json({
            success: true,
            msg: "Successfully Logged in",
            token: authtoken,
          });
      } else {
        res
          .status(400)
          .json({ success: false, msg: "Login with valid credentials" });
      }
    } else {
      res
        .status(400)
        .json({ success: false, msg: "Login with valid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
