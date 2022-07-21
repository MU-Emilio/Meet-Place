import { User } from "../lib/types";

interface Props {
  userCard: User;
  ButtonComponent: React.ReactNode;
}

const UserCard = ({ userCard, ButtonComponent }: Props) => {
  let profileImage: string | null = "";

  userCard ? (profileImage = userCard.profileImage.url) : (profileImage = null);

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
