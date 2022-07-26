import { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Loading from "./Loading";
import { Location, EventForm } from "../lib/types";
import { BiCurrentLocation } from "react-icons/bi";

const mapContainerStyle = {
  width: "30vw",
  height: "35vh",
  borderRadius: "20px",
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
      Google Maps
      <form action="">
        <div className="flex items-center">
          <Autocomplete>
            <input
              type="text"
              className="block w-96 h-10 border-2"
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
            className="bg-green-200 h-10"
          >
            <BiCurrentLocation />
          </button>
        </div>
        <p>{message}</p>
      </form>
      <div className="">
        <div className="">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            options={{ fullscreenControl: false }}
            onLoad={(map) => setMap(map)}
          >
            {" "}
            <Marker position={center} />
          </GoogleMap>
        </div>
      </div>
      <button
        onClick={() => {
          map?.panTo(center);
        }}
      >
        Center
      </button>
      <div className="flex w-fit gap-6 m-auto">
        <button
          type="button"
          className="mt-4"
          onClick={() => {
            data.location = direction;
            handlePrevField(data);
          }}
        >
          Back
        </button>
        <button
          type="submit"
          className="mt-4"
          onClick={() => {
            if (direction === "") {
              setMessage("Location is required");
            } else {
              setMessage(null);
              data.location = direction;
              handleNextField(data);
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GoogleMapsField;
