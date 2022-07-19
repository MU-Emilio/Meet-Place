import axios from "axios";
import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";

interface Props {
  userCard: User;
  friendContainer: boolean;
}

const UserCard = ({ userCard, friendContainer }: Props) => {
  let profileImage: string | null = "";

  if (userCard) {
    profileImage = userCard.profileImage.url;
  } else {
    profileImage = null;
  }

  const addFriend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/friend",
        {
          userCard: userCard,
        },
        {
          headers: {
            authorization: localStorage.getItem(SESSION_KEY) || false,
          },
        }
      );
      return;
    } catch (error) {
      alert("Cannot add friend");
    }

    alert(`Friend Added ${userCard.username}`);
  };

  const deleteFriend = () => {
    alert(`Friend Delete ${userCard.username}`);
  };

  if (!userCard) {
    return null;
  }

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
        <p>{userCard.username}</p>
        {!friendContainer && (
          <button
            className=" bg-green-200 rounded-sm text-xs"
            onClick={addFriend}
          >
            Add
          </button>
        )}

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
