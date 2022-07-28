import React from "react";
import { format } from "date-fns";
import { User, EventForm, SuggestedDateType } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";

interface Props {
  data: EventForm;
}

const SuggestedDate = ({ data }: Props) => {
  const fetchSuggested = async () => {
    const response = await axios.get(`http://localhost:3001/guests/suggested`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data.slice(0, 3);
  };

  const {
    isLoading,
    error,
    data: suggestedDates,
  } = useQuery<SuggestedDateType[]>([`suggested-${data.date}`], fetchSuggested);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-center">
      <div className=" bg-green-200">
        <h1>Don't feel confident?...</h1>
        <p>
          Here you have some suggested dates based on your friend's availability
        </p>
      </div>

      <div>
        {suggestedDates?.map((item, index) => (
          <React.Fragment key={index}>
            <p>{format(new Date(item.date + "T10:00"), "MMMMMM, dd")}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SuggestedDate;
