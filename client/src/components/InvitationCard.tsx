import { EventType } from "../lib/types";

interface Props {
  event: EventType;
}

const InvitationCard = ({ event }: Props) => {
  return <div>{event.title}</div>;
};

export default InvitationCard;
