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
            <div className="hover:scale-105 ease-in-out duration-300 mr-2 px-2">
              <UserCard
                userCard={user}
                ButtonComponent={ButtonComponent(user)}
                status={null}
              />
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default UserList;
