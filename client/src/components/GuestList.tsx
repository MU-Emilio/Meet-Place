import React from "react";
import { User } from "../lib/types";
import UserCard from "./UserCard";
import Carousel from "react-elastic-carousel";
interface Props {
  guests: User[];
}

const GuestList = ({ guests }: Props) => {
  return (
    <div className="relative flex items-center">
      <div
        id="slider"
        className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"
      >
        {guests.map((item, index) => (
          <React.Fragment key={index}>
            <div className=" inline-block cursor-pointer hover:scale-105 ease-in-out duration-300 mr-2">
              <UserCard userCard={item} ButtonComponent={null} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GuestList;
