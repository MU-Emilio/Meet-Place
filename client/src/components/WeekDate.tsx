import { startOfDay, format, isEqual } from "date-fns";
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

const WeekDate = ({ date, startDate, events }: Props) => {
  return (
    <div className=" h-screen">
      <div
        className="border h-3/6 px-1 pb-4"
        style={
          isEqual(startOfDay(date), startOfDay(startDate))
            ? styles.today
            : styles.notToday
        }
      >
        {format(date, "dd")}
        <EventsContainer events={events} date={date} complete={true} />
      </div>
    </div>
  );
};

export default WeekDate;
