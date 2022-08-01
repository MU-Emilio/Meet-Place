import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";
import React from "react";

interface Props {
  page: number;
}

const UserEventsContainer = ({ page }: Props) => {
  const fetchFriends = async () => {
    const response = await axios.get(
      "http://localhost:3001/events/:userId/:page",
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<any[]>(
    [`events-${page}`],
    fetchFriends
  );

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div>
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <p>{item.event.title}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserEventsContainer;
