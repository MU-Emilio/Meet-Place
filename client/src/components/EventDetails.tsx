import React from "react";
import GuestList from "./GuestList";
import GoogleMapContainer from "./GoogleMapContainer";

const EventDetails = () => {
  return (
    <div className=" bg-green-100 m-auto w-3/4 p-8">
      <div className="flex m-auto gap-4 w-fit">
        <div className=" bg-blue-50 w-[400px] h-[700px] p-8">
          <div className="m-auto w-fit mt-14">
            <h1 className=" text-4xl">Event Title</h1>
          </div>
          <div className="m-auto mt-6 w-fit">
            <h2 className=" text-xl">Location</h2>
          </div>
          <div className="m-auto mt-3 w-fit">
            <h2 className="text-xl">Date</h2>
          </div>
          <div className="mt-10 h-[500px]">
            <GuestList guests={[]} horizontal={false} />
          </div>
        </div>
        <GoogleMapContainer direction="San Jose" />
      </div>
    </div>
  );
};

export default EventDetails;
