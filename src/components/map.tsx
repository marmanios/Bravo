"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Window from "./window";

const Map = () => {
  return (
    <Window
      className="col-span-2 row-span-4 overflow-hidden relative"
      title="Map"
      shield
      circle="green"
    >
      <div className="grid place-content-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0">
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
      </div>
    </Window>
  );
};

export default Map;
