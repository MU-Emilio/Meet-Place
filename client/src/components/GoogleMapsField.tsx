import { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Loading from "./Loading/Loading";
import { Location, EventForm } from "../lib/types";
import {
  BiCaretRight,
  BiCaretLeft,
  BiBadgeCheck,
  BiCurrentLocation,
} from "react-icons/bi";

const mapContainerStyle = {
  width: "600px",
  height: "400px",
  borderRadius: "20px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: false,
  gestureHandling: "none",
};

interface Props {
  data: EventForm;
  handleNextField: (newData: EventForm) => void;
  handlePrevField: (newData: EventForm) => void;
}

const GoogleMapsField = ({ data, handleNextField, handlePrevField }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [center, setCenter] = useState<Location>({
    lat: 37.368832,
    lng: -122.036346,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [direction, setDirection] = useState<string>(data.location);
  const [message, setMessage] = useState<string | null>(null);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full">
      <label
        className="block text-4xl mx-auto text-center font-medium"
        htmlFor="description"
      >
        Tell your friends the{" "}
        <span className=" text-primary font-medium">location</span> for your
        event...
      </label>
      <form action="" className="mx-auto mt-[50px] w-[650px]">
        <div className="flex items-center w-fit m-auto">
          <Autocomplete>
            <input
              type="text"
              className="block text-2xl border-2 mx-auto w-[600px] px-5 py-2"
              placeholder="Direction"
              value={direction}
              onChange={(e) => {
                setDirection(e.target.value);
                try {
                  geocodeByAddress(direction)
                    .then((results) => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                      setCenter({ lat, lng });
                    });
                } catch (error) {}
              }}
              required
            ></input>
          </Autocomplete>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (direction === "") {
                setMessage("Location is required");
              } else {
                setMessage(null);
                geocodeByAddress(direction)
                  .then((results) => getLatLng(results[0]))
                  .then(({ lat, lng }) => {
                    setCenter({ lat, lng });
                  });
              }
            }}
            className="bg-secundary h-[50px] w-[30px] p-2 text-white"
          >
            <BiCurrentLocation />
          </button>
        </div>
        <p>{message}</p>
      </form>
      <div className="mx-auto mt-10 w-fit">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={options}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
        </GoogleMap>
        <button
          onClick={() => {
            map?.panTo(center);
          }}
        >
          Center
        </button>
      </div>

      <div className="flex justify-between mx-auto w-[180px] mt-[100px]">
        <button
          className="block mt-4 bg-secundary px-5 py-2 text-white font-medium rounded-md hover:opacity-50 hover:text-gray-800 hover:scale-105 ease-in-out duration-300"
          type="button"
          onClick={() => {
            data.location = direction;
            handlePrevField(data);
          }}
        >
          <BiCaretLeft />
        </button>
        <button
          type="submit"
          onClick={() => {
            if (direction === "") {
              setMessage("Location is required");
            } else {
              setMessage(null);
              data.location = direction;
              handleNextField(data);
            }
          }}
          className="block mt-4 bg-secundary px-5 py-2 text-white font-medium rounded-md hover:opacity-50 hover:text-gray-800 hover:scale-105 ease-in-out duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GoogleMapsField;
