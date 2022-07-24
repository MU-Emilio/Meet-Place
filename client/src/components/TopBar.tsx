import React from "react";
import Logo from "./Logo";
import TopBarButtonContainer from "./TopBarButtonContainer";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { User } from "../lib/types";

const TopBar = () => {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/viewer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User | null>(["user"], fetchData);

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex justify-between align-middle mb-5 h-[70px]">
      <div>
        <Logo />
      </div>

      <div>
        <TopBarButtonContainer user={data} />
      </div>
    </div>
  );
};

export default TopBar;
