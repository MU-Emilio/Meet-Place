import FriendsContainer from "./FriendsContainer";
import NotFriendsContainer from "./NotFriendsContainer";

const Users = () => {
  return (
    <div className="border m-auto w-1/2">
      <FriendsContainer />

      <NotFriendsContainer />
    </div>
  );
};

export default Users;
