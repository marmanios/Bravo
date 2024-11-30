/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

const TRANSCRIPT = [
  "Transcript of 911 call placed by Jason Ravnsborg on Saturday, September 12, 2020",
  "Transcribed by Dawn Hill, Department of Public Safety",
  "Caller: Hello.",
  "Dispatcher: Hi.",
  "Caller: Can you hear me?",
  "Dispatcher: I can.",
  "Caller: Hello.",
  "Dispatcher: 9-1-1. This is Ally. How can I help you?",
  "Caller: Ally. This…well…Ally, I’m the Attorney General. And I am…I don’t know…I hit something.",
  "Dispatcher: You hit something?",
  "Caller: By Highmore. Highmore. And it was in the middle of the road.",
  "Dispatcher: Okay. Give me one second here. Let me get you mapped. Do you know where you’re at?",
  "Caller: I believe I’m by Highmore. I can…I’m right...I can see the town.",
  "Dispatcher: Okay.",
  "Caller: I think that’s Highmore.",
  "Dispatcher: East or west?",
  "Caller: I just went through it. I am…west of Highmore…",
  "Dispatcher: Okay.",
  "Caller: Ah…about a mile, if that.",
  "Dispatcher: Okay. And this is Scott?",
  "Caller: Uh, say again?",
  "Dispatcher: What was your name?",
  "Caller: Jason…",
  "Dispatcher: Jason…",
  "Caller: …Ravnsborg",
  "Dispatcher: …Ravnsborg. Perfect. Okay.",
  "(Typing)",
  "Dispatcher: Are you injured at all, Jason?",
  "Caller: I am not, but my car sure as hell is.",
  "Dispatcher: Uh oh. Are you out of the roadway?",
  "Caller: I am out of the roadway. I was able to get over, but…",
  "Dispatcher: Okay.",
  "(Typing)",
  "Caller: It sure hit me…smashed my windshield…",
  "Dispatcher: Oh no. Okay, do you think it was a deer or something?",
  "Caller: I have no idea…",
  "Dispatcher: Okay…",
  "Caller: Yeah…It could be…I mean…it was right in the roadway and…",
  "Dispatcher: …(typing)…K…and were you traveling westbound then?",
  "Caller: Yes, westbound…back to Pierre.",
  "Dispatcher: Okay…(typing)…alrighty, well I will go head and let the…ah…sheriff know. He’s the one",
  "that’s on call right now. He’ll be responding from home and I’ll have him come out and talk to you and",
  "take the report. Can I just…",
  "Caller: Okay.",
  "Dispatcher: … get the license plate off your vehicle, Jason?",
  "Caller: Yes…G…zero, zero, zero, two, seven.",
  "Dispatcher: Okay. Government plate?",
  "Caller: Well, it’s a bronze star plate.",
  "Dispatcher: K…",
  "Caller: It’s my personal car…",
  "Dispatcher: K…alright…I will get him headed that way for you, Jason.",
  "Caller: Alright. Thank you.",
  "Dispatcher: You’re welcome, sir. Bye-bye.",
  "Caller: Bye",
];

import AudioStreamSender from "@/components/audio-stream-sender";
import useMetadata from "@/hooks/getMetadata";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [transcript, setTranscript] = useState<string[]>([]);
  const [i, setI] = useState(0);

  const mutation = useMetadata({
    callback: (metaData) => {
      console.log(metaData);
    },
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTranscript((prevTranscript) => [...prevTranscript, TRANSCRIPT[i]]);
  //     setI((prevI) => (prevI + 1) % TRANSCRIPT.length); // Loop through transcript

  //     if (transcript.length % 5) {
  //       mutation.mutate({ text: transcript.slice(i-5, i-1).join("\n") }); }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [i, mutation, transcript]);

  
  return (
    <div>
      <h1>Transcript</h1>
      <button
        onClick={() => {
          mutation.mutate({ text: TRANSCRIPT.slice(0, 5).join("\n") });
          console.log("");
        }}
      >
        CLick
      </button>
      <div>
        {transcript.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className=""><AudioStreamSender callback={(data) => {
        console.log(data);
        if (data?.text) {
          setTranscript((val)=>[...val, data?.text])
        }
        }}/></div>
    </div>
  );
}
