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

interface Props {
  direction: string;
  center: Location;
}

const MapField = ({ direction, center }: Props) => {
  //   const mapContainerStyle = {
  //     width: "75vw",
  //     height: "60vh",
  //     borderRadius: "20px",
  //   };

  const [wantedLocation, setWantedLocation] = useState<Location>(center);

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false,
    gestureHandling: "none",
  };

  const handlerOpen = () => {
    window.open(`https://www.google.com/maps?q=${direction}`);
  };

  const GetDirections = () => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setWantedLocation(pos);
      }
    );
  };

  return (
    <div className="map">
      <GoogleMap zoom={15.5} center={wantedLocation} options={options}>
        <Marker position={{ lat: center.lat, lng: center.lng }} />
      </GoogleMap>
      <div className="map-buttons">
        <button onClick={() => GetDirections()}>Get Directions</button>
        <button onClick={() => handlerOpen}>Open In...</button>
      </div>
    </div>
  );
};

export default MapField;
