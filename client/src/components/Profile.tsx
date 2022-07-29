import React from "react";
import { User } from "../lib/types";
import FriendsContainer from "./FriendsContainer";
import { BiEditAlt } from "react-icons/bi";
import { format } from "date-fns";

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  return (
    <div className=" mx-auto h-[650px] py-3 px-10 bg-white rounded-md border-4 border-primary">
      <div>
        <img
          src={user.profileImage.url}
          alt=""
          className=" w-[250px] h-[250px] object-cover rounded-full mx-auto hover:scale-105 ease-in-out duration-300"
        />
      </div>
      <div className="mt-10">
        <div>
          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300 rounded-sm px-4 hover:bg-blue-100">
            <div className=" text-xs">
              <p>Full Name</p>
            </div>
            <div className=" font-medium">
              <p>{user.fullName}</p>
            </div>
          </div>

          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300 rounded-sm px-4 hover:bg-blue-100">
            <div className=" text-xs">
              <p>Username</p>
            </div>
            <div className=" font-medium">
              <p>@{user.username}</p>
            </div>
          </div>

          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300 rounded-sm px-4 hover:bg-blue-100">
            <div className=" text-xs">
              <p>Email</p>
            </div>
            <div className=" font-medium">
              <p>{user.publicEmail}</p>
            </div>
          </div>

          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300 rounded-sm px-4 hover:bg-blue-100">
            <div className=" text-xs">
              <p>Created:</p>
            </div>
            <div className=" font-medium">
              <p>0 events</p>
            </div>
          </div>

          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300 rounded-sm px-4 hover:bg-blue-100">
            <div className=" text-xs">
              <p>Joined on:</p>
            </div>
            <div className=" font-medium">
              {format(new Date(user.createdAt), "MMMMMM, dd, yyyy")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
