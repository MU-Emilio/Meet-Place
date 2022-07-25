import React from "react";
import { User } from "../lib/types";

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  return (
    <div className=" mx-auto h-[650px] py-3 px-10 bg-white">
      <div>
        <img
          src={user.profileImage.url}
          alt=""
          className=" w-[250px] h-[250px] object-cover rounded-full mx-auto"
        />
      </div>
      <div className="mt-10">
        <div>
          <div className=" bg-gray-50">
            <div className=" text-xs">
              <p>Full Name</p>
            </div>
            <div className="">
              <p>Full Name</p>
            </div>
          </div>

          <div className=" bg-gray-50">
            <div className=" text-xs">
              <p>Username</p>
            </div>
            <div className="">
              <p>@{user.username}</p>
            </div>
          </div>

          <div className=" bg-gray-50">
            <div className=" text-xs">
              <p>Email</p>
            </div>
            <div className="">
              <p>@{user.publicEmail}</p>
            </div>
          </div>

          <div className=" bg-gray-50">
            <div className=" text-xs">
              <p>Event</p>
            </div>
            <div className="">
              <p>0 event</p>
            </div>
          </div>

          <div>
            <div>Friends Container</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
