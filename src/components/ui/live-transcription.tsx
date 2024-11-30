import React, { useEffect, useState } from 'react';

const LiveTranscription = () => {
  const [transcriptions, setTranscriptions] = useState<string[]>([]);

  useEffect(() => {
    // Create WebSocket connection for transcriptions (only once)
    const ws = new WebSocket('wss://5f17-129-100-255-122.ngrok-free.app/websocket/transcriptions');

    // When a message is received, parse the transcription and update the state
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.transcription) {
        setTranscriptions((prev) => [...prev, data.transcription]);
      }
    };

    // Handle WebSocket closing
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup WebSocket connection when the component is unmounted or before the next effect
    return () => {
      console.log('Cleaning up WebSocket connection');
      ws.close();
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>Live Transcription</h1>
      <div>
        {transcriptions.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default LiveTranscription;
