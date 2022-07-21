import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import UserList from "./UserList";
import DeleteFriendButton from "./DeleteFriendButton";

const FriendsContainer = () => {
  const fetchFriends = async () => {
    const response = await axios.get("http://localhost:3001/friends", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User[]>(
    ["friends"],
    fetchFriends
  );

  return (
    <div className="border w-full p-5">
      {data && !isLoading ? (
        <UserList
          users={data}
          ButtonComponent={(userInfo) => (
            <DeleteFriendButton userCard={userInfo} />
          )}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FriendsContainer;
