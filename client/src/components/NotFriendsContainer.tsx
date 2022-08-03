import { User } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import UserList from "./UserList";
import AddFriendButton from "./AddFriendButton";
import { BiGroup } from "react-icons/bi";
import Loading from "./Loading/Loading";

const NotFriendsContainer = () => {
  const fetchUsers = async () => {
    const response = await axios.get(`${API_URL}/friends/notFriends`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User[]>(["users"], fetchUsers);

  return (
    <div className="border w-full h-[310px]">
      <div className="bg-secundary flex gap-2 items-center pl-3">
        <BiGroup className=" font-medium text-white" />
        <h2 className=" p-2 text-white font-medium">Other Users</h2>
      </div>

      <div className="p-5 h-[270px] overflow-y-auto">
        {data && !isLoading ? (
          <UserList
            users={data}
            ButtonComponent={(userInfo) => (
              <AddFriendButton userCard={userInfo} />
            )}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default NotFriendsContainer;
