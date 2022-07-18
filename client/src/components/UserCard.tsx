import { User } from "../lib/types";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  let profileImage: string | null = "";

  if (user.profileImage) {
    profileImage = user.profileImage.url;
  } else {
    profileImage = null;
  }

  const addFriend = () => {
    alert(`Friend Added ${user.username}`);
  };

  const deleteFriend = () => {
    alert(`Friend Delete ${user.username}`);
  };

  return (
    <div className="flex items-center my-4">
      {profileImage && (
        <img
          src={profileImage}
          alt="profileImage"
          className=" w-10 rounded-full"
        />
      )}
      <div className=" flex gap-3">
        <p>{user.username}</p>
        <button
          className=" bg-green-200 rounded-sm text-xs"
          onClick={addFriend}
        >
          Add
        </button>
        <button
          className=" bg-red-200 rounded-sm text-xs"
          onClick={deleteFriend}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
