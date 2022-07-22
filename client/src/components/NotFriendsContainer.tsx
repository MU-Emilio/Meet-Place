import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import UserList from "./UserList";
import AddFriendButton from "./AddFriendButton";

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
    <div className="border w-full p-5">
      {data && !isLoading ? (
        <UserList
          users={data}
          ButtonComponent={(userInfo) => (
            <AddFriendButton userCard={userInfo} />
          )}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NotFriendsContainer;
