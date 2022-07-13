import { startOfDay, format } from "date-fns";
interface Props {
  date: Date;
}

const styles = {
  today: {
    color: "blue",
  },
  notToday: {
    color: "black",
  },
};

const CalendarDate = ({ date }: Props) => {
  return (
    <div>
      <p
        className="border h-20 px-1"
        style={
          format(date, "MM/dd/yyyy") ==
          format(startOfDay(new Date()), "MM/dd/yyyy")
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
