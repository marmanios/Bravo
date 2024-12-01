import useCallLog from "@/context/use-call-log";
import { cn } from "@/utils";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Circle,
  EllipsisVertical,
  ShieldCheck,
  X,
} from "lucide-react";
import { use, useEffect, useState } from "react";

type props = {
  title: string;
  loading: "initialize" | "fetching" | "completed";
  loadingOffset?: number;
  children?: React.ReactNode;
  className?: string;
  shield?: boolean;
  sort?: React.ReactNode;
  parentID?: string;
  controlSelected?: boolean;
  expandable?: boolean;
};

function Window({
  title,
  children,
  className,
  shield,
  sort,
  loadingOffset,
  loading,
  parentID,
  controlSelected,
  expandable,
}: props) {
  const {
    selectedCallLog,
    setSelectedCallLog,
    expandTranscript,
    setExpandTranscript,
    setInCall,
    setCreateMode,
    setEditMode,
  } = useCallLog();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (loading === "fetching") {
      setFetching(true);
      const timeout = setTimeout(() => {
        setFetching(false);
      }, loadingOffset ?? 1000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <div className={cn("border rounded transition-all", className)}>
      <div className="relative z-10 bg-card px-2 py-1 border-b flex items-center">
        <h2 className="font-light uppercase">
          {title}
          {controlSelected
            ? selectedCallLog
              ? ` - #${selectedCallLog.id}`
              : ""
            : ""}
        </h2>
        <div className="ml-auto flex">
          <Circle
            strokeWidth={0.7}
            size={18}
            className={cn(
              loading === "initialize" && "text-destructive fill-destructive",
              fetching && "text-yellow-500 fill-yellow-500",
              loading !== "initialize" &&
                !fetching &&
                "text-green-500 fill-green-500"
            )}
          />

          {shield && (
            <ShieldCheck className="ml-1.5" strokeWidth={0.7} size={18} />
          )}
          {sort}
          {controlSelected && selectedCallLog && (
            <X
              onClick={() => {
                setSelectedCallLog(null);
                setInCall(false);
                setCreateMode(false);
                setEditMode(false);
              }}
              className="ml-1.5 cursor-pointer"
              strokeWidth={0.7}
              size={18}
            />
          )}
          {expandable &&
            (expandTranscript ? (
              <ArrowRightFromLine
                strokeWidth={0.7}
                className="ml-1.5 cursor-pointer"
                size={18}
                onClick={() => {
                  setExpandTranscript(false);
                }}
              />
            ) : (
              <ArrowLeftFromLine
                strokeWidth={0.7}
                className="ml-1.5 cursor-pointer"
                size={18}
                onClick={() => {
                  setExpandTranscript(true);
                }}
              />
            ))}
          <EllipsisVertical strokeWidth={0.7} size={18} />
        </div>
      </div>
      <div id={parentID} className="overflow-y-auto h-[calc(100%-33px)]">
        {loading === "initialize" ? (
          <div></div>
        ) : fetching ? (
          <div className="flex justify-center items-center h-[calc(100%-33px)]">
            Loading...
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default Window;
