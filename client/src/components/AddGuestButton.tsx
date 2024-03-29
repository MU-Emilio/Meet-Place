import { User } from "../lib/types";

interface Props {
  userCard: User;
  handleAddGuest: (user: User) => void;
}

const AddGuestButton = ({ userCard, handleAddGuest }: Props) => {
  return (
    <button
      type="button"
      className=" bg-green-200 rounded-sm text-xs h-fit px-2 py-1 cursor-pointer hover:scale-105 ease-in-out duration-300"
      onClick={() => handleAddGuest(userCard)}
    >
      Add Guest
    </button>
  );
};

export default AddGuestButton;
