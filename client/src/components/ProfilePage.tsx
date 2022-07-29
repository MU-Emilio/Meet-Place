import React, { useEffect } from "react";
import { ProfileContainer } from "./ProfileContainer";
import FriendsContainer from "./FriendsContainer";
import NotFriendsContainer from "./NotFriendsContainer";

const ProfilePage = () => {
  return (
    <div className="h-[800px] flex justify-around">
      <ProfileContainer />
      <div className="h-[750px] w-2/6 p-10 bg-gray-100 rounded-lg">
        <h1 className=" font-medium text-2xl">Users:</h1>
        <div className=" mx-auto h-[650px] py-3 px-10 bg-white rounded-md border-4 border-primary">
          <FriendsContainer />
          <NotFriendsContainer />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
