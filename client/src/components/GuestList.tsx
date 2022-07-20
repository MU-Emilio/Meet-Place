import React from "react";
import { User } from "../lib/types";

interface Props {
  guests: User[];
}

const GuestList = ({ guests }: Props) => {
  return (
    <>
      {guests.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <p>{item.username}</p>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default GuestList;
