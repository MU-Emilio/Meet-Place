import React from "react";
import { User, Guest } from "../lib/types";
import UserCard from "./UserCard";
interface Props {
  guests: Guest[];
  horizontal: boolean;
}

const GuestList = ({ guests, horizontal }: Props) => {
  return (
    <div className="relative flex items-center">
      <div
        id="slider"
        className={`w-full ${
          horizontal ? "h-full" : " h-[220px]"
        } overflow-y-auto whitespace-nowrap scroll-smooth`}
      >
        {guests.map(
          (item, index) =>
            item && (
              <React.Fragment key={index}>
                <div
                  className={`${
                    horizontal && "inline-block"
                  } cursor-pointer hover:scale-105 ease-in-out duration-300 mr-2 px-2`}
                >
                  <UserCard
                    userCard={item.guest}
                    ButtonComponent={null}
                    status={item.status}
                  />
                </div>
              </React.Fragment>
            )
        )}
      </div>
    </div>
  );
};

export default GuestList;
