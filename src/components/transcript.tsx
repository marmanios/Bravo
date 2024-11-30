"use client";

import {
  TEMPTRANSCRIPT,
  TEMPTRANSCRIPTLINK,
  TEMPTRANSCRIPTCUES,
} from "@/utils/constants";
import Window from "./window";
import { cn } from "@/utils";
import { useState } from "react";
import useTranscript from "@/hooks/getTranscript";
import { TTranscriptCue } from "@/utils/types";

export default function Transcript() {
  
  console.log(process.env);
  const [visibleCues, setVisisbleCues] = useState<TTranscriptCue>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { data: transcript, isLoading } = useTranscript(TEMPTRANSCRIPTLINK);

  return (
    <Window className="col-span-2 row-span-3" title="Transcript" circle="red">
      <div className="flex flex-col gap-6 p-2 font-light texts">
        {/* { TEMPTRANSCRIPT.map((message) =>
          message.type === "message" ? (
            <div key={`message_${message.messageId}`} className={cn("flex justify-between")}>
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
            <div key={`event_${message.messageId}`}  className="flex">
              <p className="ml-auto uppercase">[{message.text}]</p>
              <p className="ml-auto">{message.time.toLocaleTimeString()}</p>
            </div>
          )
        )} */}
        {TEMPTRANSCRIPTCUES.map((cue, index) => (
          <div key={`cue_${index}`} className={cn("flex justify-between")}>
            <p className={"basis-[80%]"}>
              {/* <span className="font-normal">[{message.speaker}]</span>{" "} */}
              {cue.text}
            </p>
            <p className="">{cue.start}</p>
          </div>
        ))}
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
