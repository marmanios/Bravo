"use client";

import "regenerator-runtime/runtime";
import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import usePostTranscript from "@/hooks/postTranscript";
import useCallLogs from "@/hooks/getAllCallLogs";
import usePutCallLog from "@/hooks/putCallLog";

export default function Dictaphone(): JSX.Element {
  const [newStringObject, setNewStringObject] = useState<
    { text: string; timestamp: number }[]
  >([]);
  // const [ logID, setLogID ] = useState<number | null>(0);
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number | null>(null);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // Store the interval ID to clear it
  const previousTranscriptRef = useRef<string>(""); // Use useRef for previous transcript comparison
  const lastTimestampRef = useRef<number>(0); // To store the last timestamp for each addition

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const usePostTranscriptMutation = usePostTranscript();
  // const { status, data } = useCallLogs();
  const { mutate: putLog, data: createdLog } = usePutCallLog();

  // useEffect(() => {
  //   if (data) {
  //   const maxIdEntry = data.reduce((max, entry) => (entry.id > max.id ? entry : max), data[0]);
  //   setLogID(maxIdEntry.id + 1);
  //   }
  // }, [data]);

  useEffect(() => {
    if (listening) {
      if (!startTime) setStartTime(Date.now());

      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }

      const id = setInterval(() => {
        if (transcript && startTime !== null) {
          const elapsedTime = parseFloat(
            ((Date.now() - startTime) / 1000).toFixed(2)
          );

          // Use a pointer to track where we left off
          const previousTranscriptLength = previousTranscriptRef.current.length;
          const newTranscript = transcript;
          const newWords = newTranscript.slice(previousTranscriptLength).trim();

          if (newWords) {
            // Add only the new words with a timestamp
            setNewStringObject((prev) => [
              ...prev,
              { text: newWords, timestamp: elapsedTime },
            ]);

            // Update the backend
            if (createdLog != null) {
              usePostTranscriptMutation.mutate({
                logID: createdLog.id,
                transcript: [
                  ...newStringObject,
                  { text: newWords, timestamp: elapsedTime },
                ],
              });
            }

            // Move the pointer forward
            previousTranscriptRef.current = newTranscript;
          }
        }
      }, Math.random() * 1200 + 600);

      intervalIdRef.current = id;
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [listening, transcript, startTime]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <React.Fragment>
        <span>Browser doesn't support speech recognition.</span>
      </React.Fragment>
    );
  }

  // Generate a random phone number as a string
  function generateRandomPhoneNumber(): string {
    const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return phoneNumber.toString();
  }

  function startRecording() {
    if (firstClick) {
      putLog({
        name: "",
        phone_number: generateRandomPhoneNumber(),
        address: "",
        city: "",
        location_description: "",
        description: "",
        type: "",
        priority: "",
        response_type: "",
        response_status: "",
      });
      setFirstClick(false);
    }
    SpeechRecognition.startListening({ continuous: true });
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Call ID: {"Pending"}</h1>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={startRecording}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
}
