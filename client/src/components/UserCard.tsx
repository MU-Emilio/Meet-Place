import { useNavigate } from "react-router-dom";
import { User } from "../lib/types";
import InviteStatus from "./InviteStatus/InviteStatus";

interface Props {
  userCard: User;
  ButtonComponent: React.ReactNode | null;
  status: string | null;
}

const UserCard = ({ userCard, ButtonComponent, status }: Props) => {
  const navigate = useNavigate();

  let profileImage: string | null = "";

  userCard ? (profileImage = userCard.profileImage.url) : (profileImage = null);

  return (
    <div
      className="flex items-center my-4 justify-between"
      onClick={() => {
        if (!ButtonComponent) {
          navigate(`/users/${userCard.username}`);
        }
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          {status && <InviteStatus status={status} />}
          {profileImage && (
            <img
              src={profileImage}
              alt="profileImage"
              className=" object-cover w-10 h-10 rounded-full cursor-pointer"
              onClick={() => {
                if (ButtonComponent) {
                  navigate(`/users/${userCard.username}`);
                }
              }}
            />
          )}
        </div>
        <div className=" flex gap-3">
          <p>{userCard.username}</p>
        </div>
      </div>
      {ButtonComponent && ButtonComponent}
    </div>
  );
};

export default UserCard;
