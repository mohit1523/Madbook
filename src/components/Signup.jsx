import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersContext } from "../context/UsersContext";
import { useContext } from "react";

export default function Signup() {
  const [userdata, setUserdata] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let userProfilePhoto = "";

  const ctxValue = useContext(usersContext);
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (userdata.password !== userdata.confirmPassword) {
      alert("Password does not match");
      return;
    }
    if (userdata.name === "You") {
      alert("Not a Valid Name");
    }
    if (userProfilePhoto === "") {
      return alert("Please select a Profile Photo");
    }

    let formdata = new FormData();
    formdata.append("name", userdata.name);
    formdata.append("username", userdata.username);
    formdata.append("email", userdata.email);
    formdata.append("password", userdata.password);
    formdata.append("profilePhoto", userProfilePhoto);

    await fetch("http://localhost:3000/user/createuser", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("token", data.authtoken);
          ctxValue.fetchUserDetails();
          alert("User Created");
          setUserdata({
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/");
        }
      });
  };

  const onChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    userProfilePhoto = e.target.files[0];
    getImgData();
  };

  const getImgData = () => {
    if (userProfilePhoto) {
      let imgPreview = document.querySelector(".userProfilePhoto");
      const fileReader = new FileReader();
      fileReader.readAsDataURL(userProfilePhoto);
      fileReader.addEventListener("load", function () {
        imgPreview.innerHTML = '<img src="' + this.result + '" />';
      });
    }
  };

  return (
    <div className="signup">
      <form
        autoComplete="off"
        className="signupForm"
        action=""
        onSubmit={handleSubmit}
      >
        <h1>Signup</h1>
        <div>
          <i className="fa-brands fa-mdb"></i>
          <input
            required
            type="text"
            value={userdata.name}
            onChange={onChange}
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <i className="fa-solid fa-user"></i>
          <input
            required
            type="text"
            value={userdata.username}
            onChange={onChange}
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <i className="fa-solid fa-envelope"></i>
          <input
            required
            type="email"
            value={userdata.email}
            onChange={onChange}
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <i className="fa-solid fa-key"></i>
          <input
            required
            type="password"
            name="password"
            value={userdata.password}
            onChange={onChange}
            placeholder="Enter your password"
          />
        </div>
        <div>
          <i className="fa-solid fa-key"></i>
          <input
            required
            type="password"
            name="confirmPassword"
            value={userdata.confirmPassword}
            onChange={onChange}
            placeholder="Enter your password again"
          />
        </div>
        <div>
          <input type="submit" value="Signup" />
        </div>
      </form>

      <div>
        <div className="userProfilePhoto"></div>
        <h4>Profile Photo : </h4>
        <div>
          <input type="file" name="userProfilePhoto" onChange={onFileChange} />
        </div>
      </div>
    </div>
  );
}
