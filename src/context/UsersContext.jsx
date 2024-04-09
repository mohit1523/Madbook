import { useEffect } from "react";
import { createContext, useState } from "react";

//create a context, with createContext api
export const usersContext = createContext();

const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [currUser, setCurrUser] = useState({});

  const fetchUserDetails = async () => {
    await fetch("http://localhost:3000/user/getusers", {
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
        let newData = data.users.map((elem) => {
          if (elem._id === data.user.id) {
            setCurrUser(elem);
            return { ...elem, name: "You" };
          }
          return elem;
        });
        setUserDetails(newData);
      });
  };
  useEffect(() => {
    fetchUserDetails();
  });

  const ctxValue = {
    userDetails,
    setUserDetails,
    fetchUserDetails,
    currUser
  };

  return (
    <usersContext.Provider value={ctxValue}>
      {props.children}
    </usersContext.Provider>
  );
};

export default UserDetailsProvider;
