import FriendsContainer from "./FriendsContainer";
import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";

const Friends = () => {
  const fetchFriends = async () => {
    const response = await axios.get("http://localhost:3001/friends", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    console.log(response.data);
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User[]>(
    ["friends"],
    fetchFriends
  );

  return (
    <div className="border m-auto w-10/12">
      <h1>Friends:</h1>
      {!isLoading && data ? <FriendsContainer friends={data} /> : null}
    </div>
  );
};

export default Friends;
