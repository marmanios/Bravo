import { TEMPCALLS } from "@/utils/constants";
import CallCard from "./call-card";
import Window from "./window";

export default function CallLog() {
  return (
    <Window
      className="col-span-1 row-span-4"
      title="Call Log"
      shield
      circle="green"
    >
      {TEMPCALLS.map((log) => {
        return <CallCard {...log} />;
      })}
    </Window>
  );
}
