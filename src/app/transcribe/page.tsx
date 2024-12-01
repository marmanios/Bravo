'use client';

import 'regenerator-runtime/runtime';
import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import usePostTranscript from '@/hooks/postTranscript';

export default function Dictaphone(): JSX.Element {
  const [newStringObject, setNewStringObject] = useState<{ text: string; timestamp: number }[]>([]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [startTime, setStartTime] = useState<number | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // Store the interval ID to clear it
  const previousTranscriptRef = useRef<string>(''); // Use useRef for previous transcript comparison
  const lastTimestampRef = useRef<number>(0); // To store the last timestamp for each addition
  const usePostTranscriptMutation = usePostTranscript();

  if (!browserSupportsSpeechRecognition) {
    return <React.Fragment><span>Browser doesn't support speech recognition.</span></React.Fragment>;
  }

  useEffect(() => {
    // Start polling when speech recognition is active
    if (listening) {
      // Record the start time when polling begins
      if (!startTime) setStartTime(Date.now());

      // Clear any existing interval if present
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }

      // Start polling every 1-2 seconds (random interval)
      const id = setInterval(() => {
        if (transcript && startTime !== null) {
          // Calculate elapsed time in seconds since polling started
          const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

          // Get the new additions to the transcript (what has changed since the last poll)
          const newTranscriptPart = transcript.replace(previousTranscriptRef.current, "");

          if (newTranscriptPart) {
            // Only add to the object if the new part is not empty
            setNewStringObject((prev) => {
              const updatedObject = [
                ...prev,
                { text: newTranscriptPart, timestamp: elapsedTime }
              ];

              // Update the previous transcript in the ref for the next comparison
              previousTranscriptRef.current = transcript;

              return updatedObject;
            });
            
            usePostTranscriptMutation.mutate({ transcript: newStringObject });

            lastTimestampRef.current = elapsedTime; // Update the last timestamp
          }
        }
      }, Math.random() * 600 + 200); // Random interval between 0.6 and 0.8 seconds

      intervalIdRef.current = id; // Store the interval ID in the ref
    } else if (intervalIdRef.current) {
      // Stop polling if listening is turned off
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null; // Clear the stored interval ID
    }

    // Cleanup the interval when the component is unmounted or listening is turned off
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // Clear the interval when component unmounts
      }
    };
  }, [listening, transcript, startTime]); // Effect depends on listening state, transcript, and startTime

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
}
