import React from "react";
import ProfileButtonBar from "./ProfileButtonBar";

const styles = {
  topBarButtons: {
    width: "500px",
    height: "100px",
  },
};

const TopBarButtonContainer = () => {
  return (
    <div
      style={styles.topBarButtons}
      className="bg-gray-100 flex justify-between gap-4 px-3 py-5 align-middle mb-5 rounded-md shadow-sm"
    >
      <button
        onClick={() => {}}
        className=" h-full w-[120px] bg-gray-200 p-2 rounded-md shadow-md hover:scale-105 ease-in-out duration-300"
      >
        Calendar
      </button>

      <button
        onClick={() => {}}
        className=" h-full w-[120px] bg-gray-200 p-2 rounded-md shadow-md hover:scale-105 ease-in-out duration-300"
      >
        Profile
      </button>

      <ProfileButtonBar />
    </div>
  );
};

export default TopBarButtonContainer;
