import { startOfDay, format } from "date-fns";
interface Props {
  date: Date;
  startDate: Date;
}

const styles = {
  today: {
    color: "blue",
  },
  notToday: {
    color: "black",
  },
};

const CalendarDate = ({ date, startDate }: Props) => {
  return (
    <div>
      <p
        className="border h-20 px-1"
        style={
          format(date, "MM/dd/yyyy") == format(startDate, "MM/dd/yyyy")
            ? styles.today
            : styles.notToday
        }
      >
        {format(date, "dd")}
      </p>
    </div>
  );
};

export default CalendarDate;
