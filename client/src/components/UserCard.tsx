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
  return (
    <div className="flex items-center my-4">
      {profileImage && (
        <img
          src={profileImage}
          alt="profileImage"
          className=" w-10 rounded-full"
        />
      )}
      <p>{user.username}</p>
    </div>
  );
};

export default UserCard;
