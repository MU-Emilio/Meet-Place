import React from "react";
import { User } from "../lib/types";
import UserCard from "./UserCard";

interface Props {
  users: User[];
}

const UsersContainer = ({ users }: Props) => {
  if (!users) {
    return null;
  }

  return (
    <>
      {users.map((user: User, index: number) => {
        return (
          <React.Fragment key={index}>
            <UserCard user={user} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default UsersContainer;
