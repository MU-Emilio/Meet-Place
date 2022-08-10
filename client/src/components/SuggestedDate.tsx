import React, { useEffect } from "react";
import { format } from "date-fns";
import { User, EventForm } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import Loading from "./Loading/Loading";

interface Props {
  data: EventForm;
  addedGuests: User[];
}

const SuggestedDate = ({ data, addedGuests }: Props) => {
  const fetchSuggested = async () => {
    const response = await axios.post(
      `${API_URL}/guests/suggested`,
      {
        guests: data.guests,
      },
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading,
    data: suggestedDates,
  } = useMutation(fetchSuggested, {
    onError: () => {
      alert("there was an error");
    },
  });

  useEffect(() => {
    mutate();
  }, [addedGuests]);

  if (isLoading || !suggestedDates) {
    return <Loading />;
  }

  return (
    <div className="text-center shadow-md">
      <div className=" bg-secundary w-[500px] p-4 font-medium text-white rounded-t-lg">
        <p>Suggested dates based on your friend's availability</p>
      </div>

      <div className="w-[500px] h-[70px] overflow-y-auto flex gap-3 px-3">
        {suggestedDates?.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <p
              className={`text-sm ${
                item.date === data.date && "font-bold text-primary"
              }`}
            >
              {format(new Date(item.date + "T10:00"), "MMMMMM, dd")}
            </p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SuggestedDate;
