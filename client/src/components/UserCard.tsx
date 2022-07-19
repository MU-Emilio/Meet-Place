import axios from "axios";
import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  userCard: User;
  isFriendContainer: boolean;
}

const UserCard = ({ userCard, isFriendContainer }: Props) => {
  let profileImage: string | null = "";

  if (userCard) {
    profileImage = userCard.profileImage.url;
  } else {
    profileImage = null;
  }

  const queryClient = useQueryClient();

  const addFriend = async () => {
    const { data: response } = await axios.post(
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
    return response.data;
  };

  const { mutate, isLoading } = useMutation(addFriend, {
    onSuccess: (data) => {
      console.log(data);
      const message = "success";
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

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
        {!isFriendContainer && (
          <button
            className=" bg-green-200 rounded-sm text-xs"
            onClick={addFriend}
          >
            Add
          </button>
        )}

        {isFriendContainer && (
          <button
            className=" bg-red-200 rounded-sm text-xs"
            onClick={deleteFriend}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
