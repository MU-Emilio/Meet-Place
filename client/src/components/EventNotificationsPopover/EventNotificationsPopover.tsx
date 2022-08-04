import "./EventNotificationsPopover.css";

interface Props {
  notificationIsOpen: boolean;
  handleClickNotifications: () => void;
}

const EventNotificationsPopover = ({
  notificationIsOpen,
  handleClickNotifications,
}: Props) => {
  return (
    <div
      className={`notificationPop ${
        notificationIsOpen ? "fadeIn" : "fadeOut"
      } rounded-md bg-white border-2 border-black`}
    >
      EventNotificationsPopover
    </div>
  );
};

export default EventNotificationsPopover;
