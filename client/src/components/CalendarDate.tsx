import { startOfDay, format, isEqual } from "date-fns";
import { useNavigate } from "react-router-dom";
import { EventType } from "../lib/types";
import EventsContainer from "./EventsContainer";

interface Props {
  date: Date;
  startDate: Date;
  events: { [key: string]: EventType[] };
}

const styles = {
  today: {
    color: "blue",
  },
  notToday: {
    color: "black",
  },
};

const CalendarDate = ({ date, startDate, events }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    confirm("Do you want to create a event?") && navigate("/addEvent");
  };

  return (
    <div className=" cursor-pointer" onClick={handleNavigate}>
      <div
        className="border h-24 px-1 pb-4"
        style={
          isEqual(startOfDay(date), startOfDay(startDate))
            ? styles.today
            : styles.notToday
        }
      >
        {format(date, "dd")}
        <EventsContainer events={events} date={date} />
      </div>
    </div>
  );
};

export default CalendarDate;
