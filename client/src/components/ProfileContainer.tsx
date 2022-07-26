import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { User } from "../lib/types";
import Profile from "./Profile";
import { useParams } from "react-router-dom";

export const ProfileContainer = () => {
  const params = useParams();

  const fetchData = async () => {
    console.log(params.username);
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
    ["profile"],
    fetchData
  );

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
    <div className="h-[750px] w-2/6 p-10 bg-gray-100 rounded-lg">
      <Profile user={data} />
    </div>
  );
};
