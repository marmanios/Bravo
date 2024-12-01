import useCallLog from "@/context/use-call-log";
import { cn } from "@/utils";
import {
  TCallLog,
  TCallType,
  TEmergencyStatus,
  callTypeMap,
} from "@/utils/types";
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
  log: TCallLog;
};

function CallCard({ log }: props) {
  const { selectedCallLog, setSelectedCallLog } = useCallLog();
  const { id, createdAt, status, type } = log;

  return (
    <div
      onClick={() => {
        setSelectedCallLog(log);
      }}
      className={cn(
        "flex items-center px-4 py-2 border-b relative cursor-pointer hover:bg-[#131f35] transition-all",
        selectedCallLog?.id === id && "bg-[#192b4a] hover:bg-[#192b4a]"
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full">
        {type && typeMap[type]}
      </div>
      <div className="flex-1">
        <div className="flex items-center ml-2">
          <p className="text-sm font-light">{type && callTypeMap[type]}</p>
          <p
            className={cn(
              "ml-auto text-xs font-light uppercase tracking-[1px]",
              status === "pending" && "text-yellow-500",
              status === "active" && "text-red-500",
              status === "resolved" && "text-green-500",
              status === "cancelled" && "text-gray-500"
            )}
          >
            {status}
          </p>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-muted ml-2">#{id}</p>
          <p className="ml-auto text-xs text-gray-500">
            {format(createdAt, "yyyy-MM-dd HH:mm:ss")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CallCard;
