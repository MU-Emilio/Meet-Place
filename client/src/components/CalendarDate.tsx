import { startOfDay, format, isEqual } from "date-fns";
import { EventType, EventTypeStatus } from "../lib/types";
import EventsContainer from "./EventsContainer";

interface Props {
  date: Date;
  startDate: Date;
  events: { [key: string]: EventTypeStatus[] };
  changeDisplay: () => void;
}

const styles = {
  today: {
    color: "#EA574A",
    fontWeight: "700",
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
        className="border h-[105px] px-1 pb-4"
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
