import React from "react";

interface Props {
  message: string;
  isHover: boolean;
}

const styles = {
  message: {
    bottom: "-10px",
    right: "0",
    zIndex: 1,
  },
};

const MessagePop = ({ isHover, message }: Props) => {
  if (isHover) {
    return (
      <p
        className=" bg-gray-100 opacity-50 absolute text-sm"
        style={styles.message}
      >
        {message}
      </p>
    );
  }

  return null;
};

export default MessagePop;
