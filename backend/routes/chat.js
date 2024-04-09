const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat.js");
const verifyuser = require("../middleware/verifyuser.js");

router.post("/getuserchat", verifyuser, async (req, res) => {
    try {
        const allChats = await Chat.find({ $or: [{ 'sender': req.curruser.id, 'receiver': req.body.receiver }, { 'receiver': req.curruser.id, 'sender': req.body.receiver }] });
        if (allChats) {
            res.status(200).send({ status: "found", allChats: allChats });
        } else {
            res.status(200).send({ status: "empty", msg: "No chats to show" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/sendmsg", verifyuser, async (req, res) => {
    const newMsg = new Chat({
        sender: req.curruser.id,
        receiver: req.body.receiver,
        msg: req.body.msg
    });
    await newMsg.save();
    res.send({ msg: "Msg sent" });
});

module.exports = router;
