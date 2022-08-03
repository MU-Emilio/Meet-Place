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
    <div className="text-center">
      <div className=" bg-green-200 w-[100px]">
        <h1>Don't feel confident?...</h1>
        <p>
          Here you have some suggested dates based on your friend's availability
        </p>
      </div>

      <div className="w-[100px] h-[100px] overflow-y-auto">
        {suggestedDates?.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <p>{format(new Date(item.date + "T10:00"), "MMMMMM, dd")}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SuggestedDate;
