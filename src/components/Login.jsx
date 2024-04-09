import React from "react";
import { useState } from "react";
import logo from "../assets/mad-logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const checkUser = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/user/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginCredentials.username,
        password: loginCredentials.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          navigate('/');
        }
        alert(data.msg);
        setLoginCredentials({ username: "", password: "" });
      });
  };

  return (
    <div className="login">
      <form className="signupForm" autoComplete="off" onSubmit={checkUser} action="">
        <h1>Login</h1>
        <div>
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={loginCredentials.username}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <i className="fa-solid fa-key"></i>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={loginCredentials.password}
            placeholder="Enter your password"
          />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
      
      <div className="side-content">
        <img src={logo} alt="mad logo" />
        <h2>Elated to see you here.</h2>
        <p>
          <strong>MadBook:</strong> Unleash your passions, connect with fellow
          enthusiasts, and dive into a world of shared obsessions. Join the
          community where your interests take center stage!"
        </p>
      </div>
    </div>
  );
}
