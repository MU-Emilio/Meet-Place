import FriendsContainer from "./FriendsContainer";
import NotFriendsContainer from "./NotFriendsContainer";

const Users = () => {
  return (
    <div className="h-[750px] p-10 bg-gray-100 rounded-lg">
      <FriendsContainer />

      <NotFriendsContainer />
    </div>
  );
};

export default Users;
