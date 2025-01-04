import { useEffect, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { UseCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../Hooks/useGeolocation";
import UseUrlPosition from "../Hooks/UseUrlPosition";
import styles from "./Map.module.css";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [userLocation, setUserLocation] = useState([]);
  // const [lat, lng] = userLocation ?? null;

  const { cities } = UseCities();

  const {
    isLoading: isLoadingPosition,
    position: GeolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = UseUrlPosition();

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (GeolocationPosition)
      setMapPosition([GeolocationPosition.lat, GeolocationPosition.lng]);
  }, [GeolocationPosition]);
  //

  useEffect(() => {
    if (GeolocationPosition)
      setUserLocation([GeolocationPosition.lat, GeolocationPosition.lng]);
  }, [GeolocationPosition]);

  // this needs to render, with out it blocking the code

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Get position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={20}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => {
          const cityLat = city.position?.lat;
          const cityLng = city.position?.lng;

          return (
            <Marker position={[cityLat, cityLng]} key={city.id}>
              <Popup>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}

        <Marker position={[userLocation?.lat, userLocation?.lng]}>
          <Popup>
            <span>your Location</span>
          </Popup>
        </Marker>

        <DitectClick />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DitectClick() {
  const navigate = useNavigate();
  useMapEvent({
    //
    // click: (e) => navigate(`from?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
