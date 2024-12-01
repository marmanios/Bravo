"use client";

import Window from "../window";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import useTranscript from "@/hooks/getTranscript";
import useMetadata from "@/hooks/getMetadata";
import useCallLog from "@/context/use-call-log";
import { format } from "date-fns";
type props = {
  loading: "initialize" | "fetching" | "completed";
};

export default function Transcript({ loading }: props) {
  const {
    inCall,
    selectedCallLog,
    expandTranscript,
    setMetaData,
    setAiThinking,
  } = useCallLog();
  // const { data: transcript, isLoading } = useTranscript(TEMPTRANSCRIPTLINK);
  const {
    data: transcript,
    status,
    refetch,
  } = useTranscript(selectedCallLog?.id);
  const [lastUpdateLength, setLastUpdateLength] = useState<number>(0);
  const metadataMutation = useMetadata({
    callback: (data) => {
      console.log("cooked!: ", data);
      setMetaData(data);
    },
  });

  useEffect(() => {
    if (metadataMutation.isPending) {
      setAiThinking(true);
    } else {
      setAiThinking(false);
    }
  }, [metadataMutation.isPending]);

  useEffect(() => {
    setLastUpdateLength(0);
  }, [selectedCallLog]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (inCall) {
      const element = document.getElementById("cues-end");
      element!.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcript, inCall]);

  useEffect(() => {
    if (transcript?.length && transcript.length > lastUpdateLength + 3) {
      const texts: string[] = transcript
        .slice(lastUpdateLength)
        .map((cue) => cue.text);
      metadataMutation.mutate({ text: texts.join("\n") });
      setLastUpdateLength(transcript.length);
    }
  }, [transcript, lastUpdateLength, metadataMutation]);

  // const [visibleCues, setVisibleCues] = useState<TTranscriptCue[]>([]);
  // const visibleCuesRef = useRef(visibleCues); // Ref to track the real-time state
  // const [isPlayingTranscript, setIsPlayingTranscript] = useState(false);

  // Sync the ref with the current state
  // useEffect(() => {
  //   visibleCuesRef.current = visibleCues;
  // }, [visibleCues]);

  // useEffect(() => {
  //   const playTranscript = async () => {
  //     for (let i = 0; i < TEMPTRANSCRIPTCUES.length; i++) {
  //       const newLine = TEMPTRANSCRIPTCUES[i];
  //       const nextLine = TEMPTRANSCRIPTCUES[i + 1];
  //       const timeToWait = (nextLine.start - newLine.start) * 1000;

  //       // Add the new line only if it hasn't already been added
  //       setVisibleCues((prevCues) => {
  //         if (prevCues.length === i) {
  //           return [...prevCues, newLine];
  //         }
  //         return prevCues; // No redundant update
  //       });

  //       if (i % 20 == 0 && i > 0) {
  //         const texts: string[] = TEMPTRANSCRIPTCUES.slice(i - 20, i).map(
  //           (cue) => cue.text
  //         );
  //         // metadataMutation.mutate({ text: texts.join("\n") });
  //       }
  //       await new Promise((resolve) => setTimeout(resolve, timeToWait));
  // const element = document.getElementById("transcript-container");
  // element!.scrollTop = element!.scrollHeight + 200;
  //     }

  //     return;
  //   };

  //   if (!isPlayingTranscript) {
  //     setIsPlayingTranscript(true); // Prevent multiple loops
  //     playTranscript();
  //   }
  // }, [isPlayingTranscript]);

  const formatMessageTime = (createdAt: string, timestamp: number) => {
    // Parse createdAt into a Date object
    const createdDate = new Date(createdAt);

    // Add message.timestamp (in seconds)
    const messageDate = new Date(createdDate.getTime() + timestamp * 1000);

    // Format the resulting date (e.g., 'yyyy-MM-dd HH:mm:ss')
    return format(messageDate, "yyyy-MM-dd HH:mm:ss");
  };

  return (
    <Window
      className={cn("col-span-2 row-span-3", expandTranscript && "col-span-4")}
      title={`Transcript`}
      loading={loading}
      loadingOffset={200}
      parentID="transcript-container"
      expandable
    >
      {selectedCallLog ? (
        <div className="flex flex-col gap-6 p-2 font-light texts">
          {status === "success" &&
            transcript?.map((message, index) => (
              <div key={`transcript_message_${index}`}>
                <p className={""}>{message.text}</p>
                <div className="flex">
                  <p className="text-sm text-muted uppercase">Caller</p>
                  <p className="text-sm text-muted ml-auto">
                    [
                    {selectedCallLog
                      ? formatMessageTime(
                          selectedCallLog?.createdAt,
                          message.timestamp
                        )
                      : message.timestamp}
                    ]
                  </p>
                </div>
              </div>
            ))}
          <div id={"cues-end"} className="flex">
            {/* <p className="ml-auto uppercase">[Call Ended]</p>
          <p className="ml-auto text-background">
            {new Date().toLocaleTimeString()}
          </p> */}
          </div>
        </div>
      ) : (
        <div className="p-4 font-light grid place-content-center h-full">
          No call selected.
        </div>
      )}
    </Window>
  );
}
