import React from "react";
import ProfileButtonBar from "./ProfileButtonBar";
import { User } from "../lib/types";
import { useNavigate } from "react-router-dom";

const styles = {
  topBarButtons: {
    width: "350px",
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
      className="bg-gray-100 flex justify-between gap-4 px-3 py-5 align-middle mb-5 rounded-md shadow-sm"
    >
      <button
        onClick={() => {
          navigate("/home");
        }}
        className=" h-full w-[120px] bg-gray-200 p-1 rounded-md shadow-md hover:scale-105 ease-in-out duration-300"
      >
        Calendar
      </button>

      <button
        onClick={() => {
          navigate("/");
        }}
        className=" h-full w-[120px] bg-gray-200 p-1 rounded-md shadow-md hover:scale-105 ease-in-out duration-300"
      >
        Profile
      </button>

      <ProfileButtonBar user={user} />
    </div>
  );
};

export default TopBarButtonContainer;
