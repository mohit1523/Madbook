import React, { useState } from "react";
import { useEffect } from "react";
import Post from "./PostComponent";
import { usersContext } from "../context/UsersContext";
import { useContext } from "react";

export default function PostForm() {
  const ctxValue = useContext(usersContext);
  const [allPost, setAllPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
  });

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
        setLoggedInUser(data.user);
        setAllPosts(data.allPosts.reverse());
      });
  };

  const handleChange = (e) => {
    setPostDetails({
      ...postDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/post/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: postDetails.title,
        description: postDetails.description,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.msg);
        setAllPosts([data.post].concat(allPost));
      });
    setPostDetails({
      title: "",
      description: "",
    });
  };

  useEffect(() => {
    callAllPosts();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="postForm">
        <input
          className="dataInput"
          id="title"
          name="title"
          value={postDetails.title}
          type="text"
          onChange={handleChange}
          required
          placeholder="Enter Title of Your Post"
        />
        <textarea
          className="dataInput"
          name="description"
          required
          onChange={handleChange}
          value={postDetails.description}
          placeholder="Enter Post Description"
          id="description"
          cols="50"
          rows="5"
        ></textarea>
        <button type="submit" className="postUploadBtn">
          <span>Post</span>
          <i className="fa-solid fa-upload"></i>
        </button>
      </form>
      {allPost &&
        allPost.map((elem) => {
          if (elem.user === loggedInUser.id) {
            return (
              <Post
                key={elem._id}
                id={elem._id}
                accountName="You"
                title={elem.title}
                description={elem.description}
                date={elem.date}
                profilePhoto={ctxValue.currUser.profilePhoto}
              />
            );
          } else {
            // Check if userDetails is available before calling find
            if (ctxValue.userDetails) {
              let currPostUser = ctxValue.userDetails.find(
                (obj) => obj._id === elem.user
              );
              return (
                <Post
                  key={elem._id}
                  id={elem._id}
                  accountName={
                    currPostUser ? currPostUser.name : "Unknown User"
                  }
                  title={elem.title}
                  description={elem.description}
                  date={elem.date}
                  profilePhoto={currPostUser.profilePhoto}
                />
              );
            } else {
              return null;
            }
          }
        })}
    </div>
  );
}
