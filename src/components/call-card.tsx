import { cn } from "@/utils";
import { TCallType, TEmergencyStatus } from "@/utils/types";
import { format } from "date-fns";
import {
  Ambulance,
  Box,
  Ear,
  Flame,
  LifeBuoy,
  PawPrint,
  Siren,
  TrafficCone,
  Zap,
} from "lucide-react";

export const typeMap = {
  Fire: <Flame strokeWidth={0.8} />,
  Medical: <Ambulance strokeWidth={0.8} />,
  Police: <Siren strokeWidth={0.8} />,
  Traffic: <TrafficCone strokeWidth={0.8} />,
  Rescue: <LifeBuoy strokeWidth={0.8} />,
  Utility: <Zap strokeWidth={0.8} />,
  PublicDisturbance: <Ear strokeWidth={0.8} />,
  AnimalControl: <PawPrint strokeWidth={0.8} />,
  Other: <Box strokeWidth={0.8} />,
};

type props = {
  id: number;
  time: string;
  status: TEmergencyStatus;
  type: TCallType;
  title: string;
};

function CallCard({ id, time, status, type, title }: props) {
  return (
    <div className="flex items-center px-4 py-2 border-b cursor-pointer hover:bg-[#16253f] transition-all">
      <div className="flex items-center justify-center w-8 h-8 rounded-full">
        {typeMap[type]}
      </div>
      <div className="flex-1">
        <div className="flex flex-col ml-2">
          <p className="text-sm font-light">{title}</p>
          <p className="text-xs text-gray-500">
            {format(time, "yyyy-MM-dd HH:mm:ss")}
          </p>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-muted ml-2">#{id}</p>
          <p
            className={cn(
              "text-xs font-light uppercase tracking-[1px]",
              status === "pending" && "text-yellow-500",
              status === "active" && "text-red-500",
              status === "resolved" && "text-green-500",
              status === "cancelled" && "text-gray-500"
            )}
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CallCard;
