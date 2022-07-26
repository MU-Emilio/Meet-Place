import React from "react";
import { RiChatPrivateFill } from "react-icons/ri";

const styles = {
  icon: {
    fontSize: "420px",
  },
};

const PrivateEventMessage = () => {
  return (
    <div className="h-[800px] pt-[80px]">
      <div>
        <RiChatPrivateFill
          className="m-auto text-primary hover:scale-105 ease-in-out duration-300"
          style={styles.icon}
        />
        <h1 className=" text-center font-medium text-4xl mt-4 ">
          Ups! It looks like you don't have access to this event...
        </h1>
      </div>
    </div>
  );
};

export default PrivateEventMessage;
