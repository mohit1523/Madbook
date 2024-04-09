import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Messages() {
  const location = useLocation();
  return (
    <>
      <div className="msg-nav">
        <Link
          to="/messages/private"
          className={location.pathname === "/messages/private" ? "tilt" : ""}
        >
          <i className="fa-solid fa-lock"></i>
          <span>Private</span>
        </Link>
        <Link
          to="/messages"
          className={location.pathname === "/messages" ? "tilt" : ""}
        >
          <i className="fa-solid fa-unlock"></i>
          <span>Public</span>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
