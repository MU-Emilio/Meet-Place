import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { User } from "../lib/types";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import EventsFeedContainer from "./EventsFeedContainer";

export const ProfileContainer = () => {
  const params = useParams();

  const fetchViewer = async () => {
    const response = await axios.get("http://localhost:3001/viewer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataViewer,
  } = useQuery<User | null>(["user"], fetchViewer);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:3001/user/${params.username}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User | null>(
    [`user-${params.username}`],
    fetchData
  );

  if (isLoading || isLoadingUser) {
    return <Loading />;
  }

  if (error instanceof Error || errorUser instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex justify-around">
      <Profile user={data} />
      {dataViewer && <EventsFeedContainer username={params.username} />}
    </div>
  );
};
