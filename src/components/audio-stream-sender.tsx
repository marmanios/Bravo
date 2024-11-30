/* eslint-disable @typescript-eslint/no-unused-vars */
import useTranscript from "@/hooks/getTranscript";
import { TTransriptResponse } from "@/utils/types";
import React, { useEffect, useRef, useState } from "react";

const AudioStreamSender = ({
  callback,
}: {
  callback: (data: TTransriptResponse | null) => void;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const mutation = useTranscript({
    callback: callback,
  });

  const recordChunk = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const mediaRecorder = await new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = async (event) => {
      console.log("Event!");
      const blob = new Blob([event.data], { type: "audio/ogg; codecs=opus" });
      const arrayBuffer = await blob.arrayBuffer();
      const uInt8Array = new Uint8Array(arrayBuffer);
      // Define a threshold for "quiet" audio (tune this as needed)
      const threshold = 10; // Adjust based on your use case
      const amplitude = calculateAmplitude(uInt8Array);
      if (amplitude > threshold) {
        console.log(`Good volume: Volume was ${amplitude}`);
        mutation.mutate(Array.from(uInt8Array));
      } else {
        console.log(`Too quiet: Volume was ${amplitude}`);
      }
      mutation.mutate(Array.from(uInt8Array));
    };
    console.log("starting");
    mediaRecorder.start();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    mediaRecorder.stop();
  };

  const startRecording = () => {
    const interval = setInterval(() => {
      recordChunk();
    }, 2000);
    intervalRef.current = interval;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      stopRecording();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Real-Time Audio Stream</h1>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`mt-4 px-4 py-2 text-white rounded ${
          isRecording ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default AudioStreamSender;

// Helper function to calculate amplitude
const calculateAmplitude = (audioData: Uint8Array): number => {
  // Center the data around 0
  const centeredData = Array.from(audioData).map((value) => value - 128);

  // Calculate RMS (Root Mean Square)
  const rms = Math.sqrt(
    centeredData.reduce((sum, value) => sum + value ** 2, 0) /
      centeredData.length
  );

  return rms; // RMS value corresponds to loudness
};
