import React from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("session_key");
    console.log(localStorage.getItem("session_key"));
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
