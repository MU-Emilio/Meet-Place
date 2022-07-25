import React from "react";
import { User } from "../lib/types";
import FriendsContainer from "./FriendsContainer";
import { BiEditAlt } from "react-icons/bi";

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  return (
    <div className=" mx-auto h-[650px] py-3 px-10 bg-white rounded-md">
      <BiEditAlt className=" ml-auto mr-0" />
      <div>
        <img
          src={user.profileImage.url}
          alt=""
          className=" w-[250px] h-[250px] object-cover rounded-full mx-auto hover:scale-105 ease-in-out duration-300"
        />
      </div>
      <div className="mt-10">
        <div>
          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300">
            <div className=" text-xs">
              <p>Full Name</p>
            </div>
            <div className="">
              <p>Full Name</p>
            </div>
          </div>

          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300">
            <div className=" text-xs">
              <p>Username</p>
            </div>
            <div className="">
              <p>@{user.username}</p>
            </div>
          </div>

          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300">
            <div className=" text-xs">
              <p>Email</p>
            </div>
            <div className="">
              <p>{user.publicEmail}</p>
            </div>
          </div>

          <div className=" bg-gray-50 mb-5 hover:scale-105 ease-in-out duration-300">
            <div className=" text-xs">
              <p>Event</p>
            </div>
            <div className="">
              <p>0 event</p>
            </div>
          </div>

          <div>
            <div>Friends</div>
            <FriendsContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
