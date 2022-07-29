import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { User } from "../lib/types";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import FriendsContainer from "./FriendsContainer";
import NotFriendsContainer from "./NotFriendsContainer";

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
      {dataViewer?.objectId === data.objectId && (
        <div className="h-[750px] w-2/6 p-10 bg-gray-100 rounded-lg">
          <h1 className=" font-medium text-2xl">Users:</h1>
          <div className=" mx-auto h-[650px] py-3 px-10 bg-white rounded-md border-4 border-primary">
            <FriendsContainer />
            <NotFriendsContainer />
          </div>
        </div>
      )}
    </div>
  );
};
