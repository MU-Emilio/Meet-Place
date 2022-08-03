import { useParams } from "react-router-dom";
import EventDetails from "./EventDetails";
import { API_URL, SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import { EventType, User } from "../lib/types";
import Loading from "./Loading";
import PrivateEventMessage from "./PrivateEventMessage";

const EventDetailsContainer = () => {
  const params = useParams();

  const fetchDetails = async () => {
    const response = await axios.get(
      `${API_URL}/events/details/${params.eventId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<EventType>(
    [`event-${params.eventId}`],
    fetchDetails
  );

  if (error) {
    return <PrivateEventMessage />;
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div>
      {data && (
        <div className="h-[800px]">
          <EventDetails event={data} />
        </div>
      )}
    </div>
  );
};

export default EventDetailsContainer;
