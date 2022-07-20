import React from "react";
import { User } from "../lib/types";
import UserCard from "./UserCard";

interface Props {
  users: User[];
  isFriendContainer: boolean;
}

const UserList = ({ users, isFriendContainer }: Props) => {
  if (!users) {
    return null;
  }

  return (
    <>
      {users.map((user: User, index: number) => {
        return (
          <React.Fragment key={index}>
            <UserCard userCard={user} isFriendContainer={isFriendContainer} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default UserList;
