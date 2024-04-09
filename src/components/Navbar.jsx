import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { usersContext } from "../context/UsersContext";

export default function Navbar() {
  const location = useLocation();
  const ctxValue = useContext(usersContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <nav>
      <div>
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Home
        </Link>
        <Link
          className={
            location.pathname === "/messages" ||
            location.pathname === "/messages/private"
              ? "active"
              : ""
          }
          to="/messages"
        >
          Messages
        </Link>
        <Link
          className={location.pathname === "/people" ? "active" : ""}
          to="/people"
        >
          People
        </Link>
        <Link
          className={location.pathname === "/profile" ? "active" : ""}
          to={`/profile/${ctxValue.currUser._id}`}
        >
          My Profile
        </Link>
      </div>
      <div>
        {localStorage.getItem("token") ? (
          <Link className="logout" onClick={handleLogout}>
            Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </Link>
        ) : (
          <>
            <Link
              className={location.pathname === "/login" ? "active" : ""}
              to="/login"
            >
              Login
            </Link>
            <Link
              className={location.pathname === "/signup" ? "active" : ""}
              to="/signup"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
