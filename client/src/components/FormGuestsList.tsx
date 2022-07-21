import React, { Dispatch, SetStateAction } from "react";
import { User } from "../lib/types";
import GuestCard from "./GuestCard";

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
            <GuestCard
              userCard={user}
              ButtonComponent={ButtonComponent(user)}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FormGuestsList;
