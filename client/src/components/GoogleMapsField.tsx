import { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Loading from "./Loading";
import { Location } from "../lib/types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { EventForm } from "../lib/types";

const mapContainerStyle = {
  width: "75vw",
  height: "60vh",
  borderRadius: "20px",
};

const GoogleMapsField = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [center, setCenter] = useState<Location>({
    lat: 37.368832,
    lng: -122.036346,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [direction, setDirection] = useState<string>("");

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full">
      Google Maps
      <form action="">
        <Autocomplete>
          <input
            type="text"
            className="border"
            placeholder="Direction"
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value);
            }}
          ></input>
        </Autocomplete>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            geocodeByAddress(direction)
              .then((results) => getLatLng(results[0]))
              .then(({ lat, lng }) => {
                setCenter({ lat, lng });
              });
          }}
        >
          Find Place!
        </button>
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
      <button onClick={() => map?.panTo(center)}>Center</button>
    </div>
  );
};

export default GoogleMapsField;
