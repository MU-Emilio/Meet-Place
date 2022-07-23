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
      className="bg-gray-100 flex px-3 py-5 align-middle mb-5 rounded-md shadow-sm"
    >
      <button
        onClick={() => {}}
        className=" h-full w-[180px] bg-gray-200 p-2 rounded-md shadow-md hover:scale-105 ease-in-out duration-300"
      >
        Create Event
      </button>
    </div>
  );
};

export default TopBarButtonContainer;
