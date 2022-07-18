import { User } from "../lib/types";

interface Props {
  friend: User;
}

const Friend = ({ friend }: Props) => {
  let profileImage: string | null = "";

  if (friend.profileImage) {
    profileImage = friend.profileImage.url;
  } else {
    profileImage = null;
  }
  return (
    <div className="flex items-center">
      {profileImage && (
        <img
          src={profileImage}
          alt="profileImage"
          className=" w-10 rounded-full"
        />
      )}
      <p>{friend.username}</p>
    </div>
  );
};

export default Friend;
