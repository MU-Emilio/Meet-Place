import { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Loading from "./Loading/Loading";
import { Location } from "../lib/types";

const mapContainerStyle = {
  width: "100%",
  height: "700px",
  borderRadius: "0 40px 40px 0",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
};

interface Props {
  direction: string;
}

const GoogleMapContainer = ({ direction }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [center, setCenter] = useState<Location>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    try {
      geocodeByAddress(direction)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setCenter({ lat, lng });
        });
    } catch (error) {}
  }, [map, direction]);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="w-[500px] h-full">
      <div className="">
        <div className="">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            options={options}
            onLoad={(map) => setMap(map)}
          >
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
    </div>
  );
};

export default GoogleMapContainer;
