"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Window from "../window";
import useCallLogs from "@/hooks/getAllCallLogs";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { callTypeMap } from "@/utils/types";
import { cn } from "@/utils";
import { format } from "date-fns";

const Map = () => {
  const { data: callLogs } = useCallLogs();

  return (
    <Window
      className="col-span-3 row-span-4 overflow-hidden relative"
      title="Map"
      shield
      circle="green"
    >
      <div className="grid place-content-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0">
        <MapContainer
          style={{
            height: "800px",
            width: "1000px",
          }}
          center={[40.75, -73.98]}
          zoom={16}
          zoomControl={false}
        >
          <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
          {callLogs?.map(
            (log) =>
              log.latitude &&
              log.longitude && (
                <Marker position={[+log.latitude, +log.longitude]}>
                  <Popup closeButton={false}>
                    <div className="bg-background border p-2 rounded font-scp text-foreground w-[300px]">
                      <div className="flex w-full items-end justify-between pl-2">
                        <div className="flex gap-2 items-end">
                          <p className="text-xs text-muted">#{log.id}</p>

                          <p className="text-sm font-light">
                            {callTypeMap[log.type ?? "Other"]}
                          </p>
                        </div>
                        <p
                          className={cn(
                            "text-xs font-light uppercase tracking-[1px] pr-2",
                            log.status === "pending" && "text-yellow-500",
                            log.status === "active" && "text-red-500",
                            log.status === "resolved" && "text-green-500",
                            log.status === "cancelled" && "text-gray-500"
                          )}
                        >
                          {log.status}
                        </p>
                      </div>
                      <p className="pl-2 pt-2">{log.description}</p>
                      <p className="pl-2 pt-2 text-right text-xs text-gray-500">
                        {format(log.createdAt, "yyyy-MM-dd HH:mm:ss")}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </div>
    </Window>
  );
};

export default Map;
