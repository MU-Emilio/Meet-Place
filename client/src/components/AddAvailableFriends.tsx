import { format } from "date-fns";
import { User, EventForm } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading/Loading";
import { API_URL } from "../lib/constants";

interface Props {
  data: EventForm;
  handleAddArrayGuests: (availableFriends: User[]) => void;
}

const AddAvailableFriends = ({ data, handleAddArrayGuests }: Props) => {
  const fetchAvailable = async () => {
    const response = await axios.get(
      `${API_URL}/guests/available/${format(
        new Date(`${data.date}T10:00:00.000Z`),
        "yyyy-MM-dd"
      )}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const {
    isLoading,
    error,
    data: availableFriends,
  } = useQuery<User[]>([`available-${data.date}`], fetchAvailable);

  if (data.date === "") {
    return <p>Please select a date</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="flex gap-6 m-auto w-fit items-center">
      <p>
        Add all friends available on
        {data.date != "" ? (
          <span className=" text-primary font-medium">
            {" "}
            {format(new Date(`${data.date}T10:00:00.000Z`), "MMMMMM, dd")}
          </span>
        ) : (
          "..."
        )}
      </p>
      {availableFriends && (
        <button
          type="button"
          className=" bg-secundary px-5 py-1 text-white font-medium rounded-lg"
          onClick={() => {
            handleAddArrayGuests(availableFriends);
          }}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default AddAvailableFriends;
