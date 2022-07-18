import React from "react";
import { User } from "../lib/types";
import Friend from "./Friend";

interface Props {
  friends: User[];
}

const FriendsContainer = ({ friends }: Props) => {
  if (!friends) {
    return null;
  }

  return (
    <>
      {friends.map((friend: User, index: number) => {
        return (
          <React.Fragment key={index}>
            <Friend friend={friend} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FriendsContainer;
