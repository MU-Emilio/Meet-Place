import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import UsersContainer from "./UsersContainer";

const Users = () => {
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

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3001/users", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    console.log(response.data);
    return response.data;
  };

  const {
    isLoading: usersAreLoading,
    error: usersError,
    data: usersData,
  } = useQuery<User[]>(["users"], fetchUsers);

  return (
    <div>
      <div className="border m-auto w-10/12">
        <h1>Friends:</h1>
        {!isLoading && data ? (
          <UsersContainer users={data} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="border m-auto w-10/12">
        <h1>All Users:</h1>
        {!usersAreLoading && usersData ? (
          <UsersContainer users={usersData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Users;