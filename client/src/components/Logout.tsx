import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("session_key");
    setUser(null);
  };

  const { setUser } = useContext(UserContext);
  return (
    <div>
      <a href="/login">
        <button onClick={handleLogout}>Logout</button>
      </a>
    </div>
  );
};

export default Logout;
