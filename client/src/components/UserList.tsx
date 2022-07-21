import React from "react";
import { User } from "../lib/types";
import UserCard from "./UserCard";
interface Props {
  users: User[];
  ButtonComponent: (userInfo: User) => JSX.Element;
}

const UserList = ({ users, ButtonComponent }: Props) => {
  if (!users) {
    return null;
  }

  return (
    <>
      {users.map((user: User, index: number) => {
        return (
          <React.Fragment key={index}>
            <UserCard userCard={user} ButtonComponent={ButtonComponent(user)} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default UserList;
