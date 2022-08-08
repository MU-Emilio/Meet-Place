import React from "react";
import { User } from "../lib/types";
import UserCard from "./UserCard";

interface Props {
  users: User[];
  ButtonComponent: (userInfo: User) => JSX.Element;
}

const FormGuestsList = ({ users, ButtonComponent }: Props) => {
  if (users.length < 0) {
    return null;
  }

  return (
    <>
      {users.map((user: User, index: number) => {
        return (
          <React.Fragment key={index}>
            <UserCard
              userCard={user}
              ButtonComponent={ButtonComponent(user)}
              status={null}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FormGuestsList;
