import React, { useContext } from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { usersContext } from "../context/UsersContext";
import { publicMsgContext } from "../context/PublicMsgContext";

const socket = io.connect("http://localhost:3000");

export default function PublicMsg() {
  const msgCtxValue = useContext(publicMsgContext);
  const [msg, setMsg] = useState("");
  // const [allMsgs, setAllMsgs] = useState([]);
  const ctxValue = useContext(usersContext);

  const sendMsg = (e) => {
    e.preventDefault();
    msgCtxValue.setAllMsgs((prevAllMsgs) => [
      ...prevAllMsgs,
      { user: "You", msg: msg },
    ]);
    socket.emit("send-msg", {
      msg: msg,
      currUser: ctxValue.currUser ? ctxValue.currUser : "",
    });
    setMsg("");
  };

  useEffect(() => {
    socket.on("msg-received", (data) => {
      msgCtxValue.setAllMsgs((prevAllMsgs) => [
        ...prevAllMsgs,
        { user: data.currUser, msg: data.msg },
      ]);
    });
    const sendBtn = document.getElementById("sendBtn");
    sendBtn.addEventListener("mousedown", () => {
      sendBtn.style.boxShadow = "0 0 5px black inset";
    });
    sendBtn.addEventListener("mouseup", () => {
      sendBtn.style.boxShadow = "0 0 0px black inset";
    });

    return () => {
      socket.off("msg-received");
    };
  }, []);

  return (
    <div className="public-messages">
      <div id="msgs">
        {msgCtxValue.allMsgs &&
          msgCtxValue.allMsgs.map((elem) => {
            return (
              <div className={elem.user === "You"?'my-msg':'other-msg'} key={Math.random()}>
                <div>{elem.user=== "You" ? "You" : elem.user.name}</div>
                <div>{elem.msg}</div>
              </div>
            );
          })}
      </div>
      <form onSubmit={sendMsg} action="">
        <input
          type="text"
          required
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <input id="sendBtn" type="submit" value="Send Message" />
      </form>
    </div>
  );
}
