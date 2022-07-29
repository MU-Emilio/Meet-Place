import { startOfDay, format, isEqual } from "date-fns";
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
    color: "#EA574A",
    fontWeight: "700",
    backgroundColor: "rgb(239 246 255)",
  },
  notToday: {
    color: "black",
  },
};

const WeekDate = ({ date, startDate, events, changeDisplay }: Props) => {
  return (
    <div className=" h-[500px]">
      <div
        className="border h-full px-1"
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
          complete={true}
          changeDisplay={changeDisplay}
        />
      </div>
    </div>
  );
};

export default WeekDate;
