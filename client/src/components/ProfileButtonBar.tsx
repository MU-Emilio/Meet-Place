import React from "react";
import { User } from "../lib/types";

interface Props {
  user: User;
}

const ProfileButtonBar = ({ user }: Props) => {
  let profileImage: string | null = "";

  user ? (profileImage = user.profileImage.url) : (profileImage = null);

  return (
    <div className="h-full w-[250px] bg-gray-200 flex px-2 py-1 rounded-md shadow-md hover:scale-105 ease-in-out duration-300 items-center">
      <div className=" px-2 flex justify-end gap-4 w-4/6 mr-0 ml-auto items-center font-medium">
        <p>{user.username}</p>
        {profileImage && (
          <img
            src={profileImage}
            alt="profileImage"
            className=" object-cover w-8 h-8 rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileButtonBar;
