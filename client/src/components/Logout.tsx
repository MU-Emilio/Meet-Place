import { useContext } from "react";
import { UserContext } from "./UserContext";
import { BiLogOut } from "react-icons/bi";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("session_key");
    setUser(null);
  };

  const { setUser } = useContext(UserContext);
  return (
    <div className=" h-[25px] w-[25px] p-1 bg-red-200 rounded-md shadow-md hover:scale-105 ease-in-out duration-300 items-center">
      <a href="/login">
        <BiLogOut onClick={handleLogout} />
      </a>
    </div>
  );
};

export default Logout;
