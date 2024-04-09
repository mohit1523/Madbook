import React, { useEffect, useState } from "react";
import Post from "./PostComponent";
import Comment from "./Comment";
import { Link, useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams();

  const [allPost, setAllPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [user, setUser] = useState({});
  const [tab, setTab] = useState("post");

  let callAllPosts = async () => {
    await fetch("http://localhost:3000/post/getallposts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllPosts(data.allPosts.reverse());
      });
  };

  let callAllComments = async () => {
    await fetch("http://localhost:3000/comment/getcommentsOfuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllComments(data.reverse());
      });
  };

  let getUser = async () => {
    await fetch("http://localhost:3000/user/getsingleuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: params.userId,
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
    callAllPosts();
    callAllComments();
  }, []);

  return (
    <div className="profile">
      <div className="user-info-box">
        <div className="user-img">
          <img src={user.profilePhoto} alt="" />
        </div>
        <div>
          <h1>{user.name}</h1>
          <h3>@{user.username}</h3>
        </div>
        <div>
          <a href={`mailto:${user.email}`} className="sendEmailBtn">
            <i className="fa-solid fa-envelope"></i> {user.email}
          </a>
        </div>
      </div>
      <img className="backImg" src={user.profilePhoto} alt="" />
      <div className="profile-nav">
        <Link
          onClick={() => setTab("post")}
          className={`${tab === "post" ? "active-tab" : ""}`}
        >
          Posts
        </Link>
        <Link
          onClick={() => setTab("like")}
          className={`${tab === "like" ? "active-tab" : ""}`}
        >
          Likes
        </Link>
        <Link
          onClick={() => setTab("comment")}
          className={`${tab === "comment" ? "active-tab" : ""}`}
        >
          Comments
        </Link>
      </div>

      <div className={`user-posts-box ${tab != "post" ? "disable-tab" : ""}`}>
        {allPost &&
          allPost.map((elem) => {
            if (elem.user === user._id) {
              return (
                <Post
                  key={elem._id}
                  id={elem._id}
                  accountName="You"
                  title={elem.title}
                  description={elem.description}
                  date={elem.date}
                  profilePhoto={user.profilePhoto}
                />
              );
            }
          })}
      </div>
      <div
        className={`user-likes-box ${tab != "like" ? "disable-tab" : ""}`}
      ></div>
      <div
        className={`user-comments-box ${tab != "comment" ? "disable-tab" : ""}`}
      >
        {allComments &&
          allComments.map((elem) => {
            return <Comment userId={elem.user} key={elem._id} text={elem.commentText} date={elem.date} />;
          })}
      </div>
    </div>
  );
}
