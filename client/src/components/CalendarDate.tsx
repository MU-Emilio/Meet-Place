import { startOfDay, format, isEqual } from "date-fns";
import { useNavigate } from "react-router-dom";
import { EventType } from "../lib/types";
import EventsContainer from "./EventsContainer";

interface Props {
  date: Date;
  startDate: Date;
  events: { [key: string]: EventType[] };
  changeDisplay: () => void;
}

const styles = {
  today: {
    color: "blue",
    backgroundColor: "rgb(239 246 255)",
  },
  notToday: {
    color: "black",
  },
};

const CalendarDate = ({ date, startDate, events, changeDisplay }: Props) => {
  return (
    <div>
      <div
        className="border h-24 px-1 pb-4"
        style={
          isEqual(startOfDay(date), startOfDay(startDate))
            ? styles.today
            : styles.notToday
        }
      >
        {format(date, "dd")}
        <EventsContainer
          events={events}
          date={date}
          complete={false}
          changeDisplay={changeDisplay}
        />
      </div>
    </div>
  );
};

export default CalendarDate;
