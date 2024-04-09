import React, { useEffect, useContext, useState } from "react";
import { usersContext } from "../context/UsersContext";

const Comment = (props) => {
  const [user, setUser] = useState({});

  let getTime = (dt) => {
    const currDay = new Date();
    const dateOfPost = new Date(dt);
    let secondSincePosted = (currDay - dateOfPost) / 1000;

    if (secondSincePosted < 60) {
      return `${Math.round(secondSincePosted)} seconds`;
    }
    secondSincePosted /= 60;
    if (secondSincePosted < 60) {
      return `${Math.round(secondSincePosted)} minutes`;
    }
    secondSincePosted /= 60;
    if (secondSincePosted < 24) {
      return `${Math.round(secondSincePosted)} hours`;
    }
    secondSincePosted /= 24;
    if (secondSincePosted < 30) {
      return `${Math.round(secondSincePosted)} days`;
    }
    secondSincePosted /= 30;
    if (secondSincePosted < 12) {
      return `${Math.round(secondSincePosted)} months`;
    }
    return `${Math.round(secondSincePosted)} years`;
  };

  let getUser = async () => {
    await fetch("http://localhost:3000/user/getsingleuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: props.userId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const styles = {
    main: {
      borderLeft: "1px solid gray",
      margin: "3vh 0",
      padding: "0 5px",
      width: "40vw",
      fontFamily: "Raleway, sans-serif",
      color: "cornflowerblue"
    },
    text: {
      margin: "2vh 0",
      color: "black",
      fontFamily: "rajdhani, sans-serif",
    }
  };

  const ctxValue = useContext(usersContext);
  return (
    <div style={styles.main} className="comment">
      <div>
        {user._id === ctxValue.currUser._id ? "You" : user.name} commented{" "}
        {getTime(props.date)} ago
      </div>
      <div style={styles.text}>{props.text}</div>
    </div>
  );
};

export default Comment;
