import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserDetailsProvider from "./context/UsersContext";
import { useEffect } from "react";
import PublicMsgContext from "./context/PublicMsgContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      (location.pathname === "/" ||
        location.pathname === "/messages" ||
        location.pathname === "/people" ||
        location.pathname === "/profile")
    ) {
      navigate("/signup");
    }
  });
  return (
    <>
      <PublicMsgContext>
        <UserDetailsProvider>
          <Navbar />
          <Outlet />
        </UserDetailsProvider>
      </PublicMsgContext>
    </>
  );
}

export default App;
