import { useState } from "react";
import EventTitleField from "./EventTitleField";
import EventDescriptionField from "./EventDescriptionField";
import EventDateGuestsField from "./EventDateGuestsField";
import { EventForm } from "../lib/types";
import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import GoogleMapsField from "./GoogleMapsField";
import { string } from "yup";

const EventCreateForm = () => {
  const [data, setData] = useState<EventForm>({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
    privacy: false,
    category: "",
    guests: [],
  });

  const [currentField, setCurrentField] = useState<number>(0);

  const navigate = useNavigate();

  const createEvent = async (formData: EventForm) => {
    const { data: response } = await axios.post(
      `${API_URL}/events/add`,
      {
        event: formData,
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

  const { mutate, isLoading } = useMutation(createEvent, {
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["events-all"]);
    },
  });

  const makeRequest = (formData: EventForm) => {
    mutate(formData);
    navigate("/home");
  };

  const handleNextField = (newData: EventForm) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (currentField + 1 === fields.length) {
      makeRequest(newData);
      return;
    } else {
      setCurrentField((prev) => prev + 1);
    }
  };

  const handlePrevField = (newData: EventForm) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentField((prev) => prev - 1);
  };

  const fields = [
    <EventTitleField
      data={data}
      handleNextField={handleNextField}
    ></EventTitleField>,
    <EventDescriptionField
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    ></EventDescriptionField>,
    <EventDateGuestsField
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />,
    <GoogleMapsField
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />,
  ];

  return <div className="h-[800px] p-[150px]">{fields[currentField]}</div>;
};

export default EventCreateForm;
