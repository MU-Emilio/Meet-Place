import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../lib/types";
import Logout from "./Logout";

interface Props {
  user: User;
}

const ProfileButtonBar = ({ user }: Props) => {
  let profileImage: string | null = "";

  user ? (profileImage = user.profileImage.url) : (profileImage = null);

  const navigate = useNavigate();

  return (
    <div className="h-full w-[220px] bg-gray-200 flex px-2 py-1 rounded-md shadow-md items-center">
      <div className=" px-2 flex justify-around gap-4 mr-0 items-center mx-auto">
        <Logout />
        <div
          className="flex justify-between gap-3 hover:scale-105 ease-in-out duration-300 bg-white rounded-md shadow-md p-1 w-[120px] items-center cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <p className="font-medium">{user.username}</p>
          <div className="w-fit">
            {profileImage && (
              <img
                src={profileImage}
                alt="profileImage"
                className=" object-cover w-7 h-7 rounded-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileButtonBar;
