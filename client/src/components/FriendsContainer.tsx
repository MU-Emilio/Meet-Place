import { User } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import UserList from "./UserList";
import DeleteFriendButton from "./DeleteFriendButton";
import { BiUser } from "react-icons/bi";
import Loading from "./Loading/Loading";

const FriendsContainer = () => {
  const fetchFriends = async () => {
    const response = await axios.get(`${API_URL}/friends`, {
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
    <div className="border w-full h-[310px] bg-white relative">
      <div className="bg-secundary flex gap-2 items-center pl-3">
        <BiUser className=" font-medium text-white" />
        <h2 className=" p-2 text-white font-medium">Your Friends</h2>
      </div>

      <div className="p-5 h-[270px] overflow-y-auto">
        {data && !isLoading ? (
          <UserList
            users={data}
            ButtonComponent={(userInfo) => (
              <DeleteFriendButton userCard={userInfo} />
            )}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default FriendsContainer;
