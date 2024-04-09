import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ChatBox(props) {
  const params = useParams();
  const { state } = useLocation();
  const thisUser = state.user;
  const [allMsgs, setAllMsgs] = useState({});
  const [currMsg, setCurrMsg] = useState("");

  useEffect(() => {
    fetchMsgs();
  });

  const fetchMsgs = async () => {
    await fetch("http://localhost:3000/chat/getuserchat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        receiver: params.receiverId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllMsgs(data);
      });
  };

  useEffect(() => {
    let msgDiv = document.querySelector(".user-chats");
    msgDiv.scrollTop = msgDiv.scrollHeight;
  }, [allMsgs]);

  const sendMsg = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/chat/sendmsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        receiver: params.receiverId,
        msg: currMsg,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrMsg("");
      });
  };

  let getTimeWithAMPM = (time) => {
    let [h, m] = time;
    return `${h % 12 ? h % 12 : 12}:${m < 10 ? "0" + m : m} ${
      h >= 12 ? "PM" : "AM"
    }`;
  };

  let getTimeOfMsg = (date) => {
    let dt = new Date(date);
    return getTimeWithAMPM([dt.getHours(), dt.getMinutes()]);
  };

  return (
    <div className="chatbox">
      <div className="user-details-chat">
        <img src={"../" + thisUser.profilePhoto} alt="" />
        <Link
          title="Click to view profile"
          to={`/profile/${params.receiverId}`}
        >
          {thisUser.name}
        </Link>
      </div>
      <div className="user-chats">
        {allMsgs.allChats &&
          allMsgs.allChats.map((elem) => {
            return (
              <div
                className={`${
                  elem.sender != thisUser._id ? "my-msg" : "other-msg"
                }`}
                key={elem._id}
              >
                <div>{elem.msg}</div>
                <div className="time-of-msg">{getTimeOfMsg(elem.date)}</div>
              </div>
            );
          })}
      </div>

      <form action="" onSubmit={sendMsg}>
        <div>
          <i className="fa-brands fa-mdb"></i>
          <input
            value={currMsg}
            onChange={(e) => {
              setCurrMsg(e.target.value);
            }}
            type="text"
            required
          />
        </div>
        <button id="sendBtn" disabled={currMsg === ""} type="submit">
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}
