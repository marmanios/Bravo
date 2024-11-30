"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer
      style={{
        height: "800px",
        width: "800px",
      }}
      center={[51.505, -0.09]}
      zoom={13}
      zoomControl={false}
    >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
    </MapContainer>
  );
};

export default Map;
