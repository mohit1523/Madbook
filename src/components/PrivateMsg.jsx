import React, { useContext, useEffect } from "react";
import logo from "../assets/mad-logo.png";
import { Link, Outlet } from "react-router-dom";
import { usersContext } from "../context/UsersContext";

export default function PrivateMsg() {
  const ctxValue = useContext(usersContext);

  return (
    <div className="private-messages">
      <div className="allpeople">
        <ul>
          {ctxValue.userDetails &&
            ctxValue.userDetails.map((elem) => {
              if (elem.name === "You") {
                return <div key={elem._id}></div>;
              } else {
                return (
                  <li key={elem._id}>
                    <Link
                      to={`/messages/private/${elem._id}`}
                      state={{ user: elem }}
                    >
                      <img
                        id={elem._id}
                        src={elem.profilePhoto}
                        alt=""
                        onError={() => {
                          document.getElementById(elem._id).src = logo;
                        }}
                      />
                      <span>{elem.name}</span>
                    </Link>
                  </li>
                );
              }
            })}
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
