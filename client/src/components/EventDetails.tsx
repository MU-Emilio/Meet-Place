import GoogleMapContainer from "./GoogleMapContainer";
import { EventType } from "../lib/types";
import {
  BiCalendar,
  BiCurrentLocation,
  BiComment,
  BiUser,
} from "react-icons/bi";
import GuestContainer from "./GuestContainer";
import CategoryContainer from "./CategoryContainer";
import { format } from "date-fns";
interface Props {
  event: EventType;
}

const EventDetails = ({ event }: Props) => {
  return (
    <div className=" bg-gray-100 m-auto w-3/4 p-8 flex h-[790px] relative">
      <div className="absolute z-10 left-1 top-1"></div>
      <div className="">
        <div className=" bg-secundary w-[400px] h-fit p-8 text-center shadow-md rounded-md ">
          <div className="bg-white p-2 mb-2 rounded-md hover:scale-105 ease-in-out duration-300 shadow-md border-l-[15px] border-r-[15px] border-primary">
            <h1 className=" text-3xl font-medium">{event.title}</h1>
          </div>
          <div className=" bg-white py-7 rounded-md shadow-md text-left text-lg">
            <div className="items-center flex gap-3 m-auto">
              <CategoryContainer
                categoryId={event.category.objectId}
                complete={true}
              />
            </div>
            <div className="items-center flex gap-3 m-auto mt-3">
              <BiCurrentLocation className=" text-primary w-1/6" />
              <h2 className="w-5/6">{event.location}</h2>
            </div>
            <div className="mt-3 items-center flex gap-3 m-auto">
              <BiCalendar className=" text-primary w-1/6" />
              <h2 className="w-5/6">
                {format(
                  new Date(`${event.date.iso.split("T")[0]}T10:00:00.000Z`),
                  "MMMMMM, dd"
                )}
              </h2>
            </div>
            <div className="mt-3 items-center flex gap-3 m-auto">
              <BiComment className=" text-primary w-1/6" />
              <h2 className="w-5/6">{event.description}</h2>
            </div>
          </div>
        </div>

        <div className="mt-10 h-[320px] bg-white rounded-md ease-in-out duration-300">
          <div className=" bg-secundary p-3 flex">
            <div className="bg-white w-fit py-1 px-10 m-auto rounded-lg flex items-center gap-3 font-medium hover:scale-105 ease-in-out duration-300">
              <BiUser className=" text-primary" />
              <h2 className="">Who's coming?...</h2>
            </div>
          </div>
          <div className="p-5">
            <GuestContainer event={event} horizontal={false} />
          </div>
        </div>
      </div>
      <div className="flex m-auto gap-4 w-fit">
        <GoogleMapContainer direction={event.location} />
      </div>
    </div>
  );
};

export default EventDetails;
