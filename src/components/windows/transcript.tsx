import { TEMPTRANSCRIPT } from "@/utils/constants";
import Window from "../window";
import { cn } from "@/utils";

export default function Transcript() {
  return (
    <Window className="col-span-2 row-span-3" title="Transcript" circle="red">
      <div className="flex flex-col gap-6 p-2 font-light text-sm">
        {TEMPTRANSCRIPT.map((message) =>
          message.type === "message" ? (
            <div className={cn("flex justify-between")}>
              <p
                className={cn(
                  "basis-[80%]",
                  message.speaker === "dispatcher" && "text-muted-foreground"
                )}
              >
                <span className="font-normal">[{message.speaker}]</span>{" "}
                {message.text}
              </p>
              <p className="">{message.time.toLocaleTimeString()}</p>
            </div>
          ) : (
            <div className="flex">
              <p className="ml-auto uppercase">[{message.text}]</p>
              <p className="ml-auto">{message.time.toLocaleTimeString()}</p>
            </div>
          )
        )}
        <div className="flex">
          <p className="ml-auto uppercase">[Call Ended]</p>
          <p className="ml-auto text-background">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </Window>
  );
}
