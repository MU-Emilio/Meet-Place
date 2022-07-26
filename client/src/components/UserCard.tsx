import { useNavigate } from "react-router-dom";
import { User } from "../lib/types";

interface Props {
  userCard: User;
  ButtonComponent: React.ReactNode | null;
}

const UserCard = ({ userCard, ButtonComponent }: Props) => {
  const navigate = useNavigate();

  let profileImage: string | null = "";

  userCard ? (profileImage = userCard.profileImage.url) : (profileImage = null);

  return (
    <div
      className="flex items-center my-4"
      onClick={() => {
        if (!ButtonComponent) {
          navigate(`/users/${userCard.username}`);
        }
      }}
    >
      {profileImage && (
        <img
          src={profileImage}
          alt="profileImage"
          className=" object-cover w-10 h-10 rounded-full"
        />
      )}
      <div className=" flex gap-3">
        <p>{userCard.username}</p>
      </div>
      {ButtonComponent && ButtonComponent}
    </div>
  );
};

export default UserCard;
