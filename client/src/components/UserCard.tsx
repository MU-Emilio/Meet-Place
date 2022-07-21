import axios from "axios";
import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  userCard: User;
  ButtonComponent: React.ReactNode;
}

const UserCard = ({ userCard, ButtonComponent }: Props) => {
  let profileImage: string | null = "";

  userCard ? (profileImage = userCard.profileImage.url) : (profileImage = null);

  // const queryClient = useQueryClient();

  // const addFriend = async () => {
  //   const { data: response } = await axios.post(
  //     "http://localhost:3001/addFriend",
  //     {
  //       userCard: userCard,
  //     },
  //     {
  //       headers: {
  //         authorization: localStorage.getItem(SESSION_KEY) || false,
  //       },
  //     }
  //   );
  //   return response.data;
  // };

  // const { mutate, isLoading } = useMutation(addFriend, {
  //   onError: () => {
  //     alert("there was an error");
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["friends"]);
  //     queryClient.invalidateQueries(["users"]);
  //   },
  // });

  // const deleteFriend = async () => {
  //   const { data: response } = await axios.post(
  //     "http://localhost:3001/deleteFriend",
  //     {
  //       userCard: userCard,
  //     },
  //     {
  //       headers: {
  //         authorization: localStorage.getItem(SESSION_KEY) || false,
  //       },
  //     }
  //   );
  //   return response.data;
  // };

  // const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(
  //   deleteFriend,
  //   {
  //     onError: () => {
  //       alert("there was an error");
  //     },
  //     onSettled: () => {
  //       queryClient.invalidateQueries(["friends"]);
  //       queryClient.invalidateQueries(["users"]);
  //     },
  //   }
  // );

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
      </div>
      {ButtonComponent}
    </div>
  );
};

export default UserCard;
