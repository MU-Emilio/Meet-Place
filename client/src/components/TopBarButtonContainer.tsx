import React from "react";
import ProfileButtonBar from "./ProfileButtonBar";
import { User } from "../lib/types";
import { useNavigate } from "react-router-dom";
import { BiCalendar, BiUser } from "react-icons/bi";

const styles = {
  topBarButtons: {
    width: "470px",
    height: "100%",
  },
};

interface Props {
  user: User;
}

const TopBarButtonContainer = ({ user }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      style={styles.topBarButtons}
      className="bg-gray-100 flex justify-between gap-4 px-3 py-5 align-middle mb-5 rounded-md shadow-sm text-sm"
    >
      <div
        onClick={() => {
          navigate("/home");
        }}
        className=" h-full w-[140px] cursor-pointer bg-gray-200 p-1 rounded-md shadow-md hover:scale-105 ease-in-out duration-300 items-center flex justify-around"
      >
        <BiCalendar /> <p>Calendar</p>
      </div>

      <div
        onClick={() => {
          navigate(`/users/${user.username}`);
          window.location.reload();
        }}
        className=" h-full w-[140px] cursor-pointer bg-gray-200 p-1 rounded-md shadow-md hover:scale-105 ease-in-out duration-300 items-center flex justify-around"
      >
        <BiUser /> <p>Profile</p>
      </div>

      <ProfileButtonBar user={user} />
    </div>
  );
};

export default TopBarButtonContainer;
