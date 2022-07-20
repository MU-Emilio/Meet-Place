import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import UsersContainer from "./UsersContainer";

const NotFriendsContainer = () => {
  const fetchUsers = async () => {
    const response = await axios.get(
      "http://localhost:3001/friends/notFriends",
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User[]>(["users"], fetchUsers);

  return (
    <div className="border">
      {data && !isLoading ? (
        <UsersContainer users={data} isFriendContainer={false} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NotFriendsContainer;
