import React from "react";
import GuestList from "./GuestList";
import GoogleMapContainer from "./GoogleMapContainer";
import { EventType, User } from "../lib/types";
import {
  BiTrash,
  BiCalendar,
  BiCurrentLocation,
  BiComment,
} from "react-icons/bi";
interface Props {
  event: EventType;
  guests: User[];
}

const EventDetails = ({ event, guests }: Props) => {
  return (
    <div className=" bg-gray-100 m-auto w-3/4 p-8">
      <div className="flex m-auto gap-4 w-fit">
        <div className=" bg-secundary w-[400px] h-[700px] p-8 text-center shadow-md rounded-sm">
          <div className="mt-14">
            <h1 className=" text-4xl">{event.title}</h1>
          </div>
          <div className="mt-6 items-center flex gap-2 m-auto">
            <BiCurrentLocation />
            <h2 className=" text-xl">{event.location}</h2>
          </div>
          <div className="mt-3 items-center flex gap-2 m-auto">
            <BiCalendar />
            <h2 className="text-xl">{event.date.iso}</h2>
          </div>
          <div className="mt-3 items-center flex gap-2 m-auto">
            <BiComment />
            <h2 className="text-xl">{event.description}</h2>
          </div>
          <div className="mt-10 h-[300px] bg-white p-5">
            <GuestList guests={guests} horizontal={false} />
          </div>
        </div>
        <GoogleMapContainer direction={event.location} />
      </div>
    </div>
  );
};

export default EventDetails;
